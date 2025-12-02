<?php

  function qrcodeAttendanceLogout($conn) {

    date_default_timezone_set("Asia/Manila");

    $data = json_decode(file_get_contents("php://input"),true);
    
    $student_id = $data['student_id'];
    $date = date("Y-m-d");
    $time_out = date("H:i:s");

    $checkResult = checkStudentAttendance($conn, $student_id, $date);

    if ($checkResult->num_rows == 0) {
      echo json_encode(['success' => false, 'messages' => 'You are not logged in. Please log in first.']);

      return;
    }

    $stmt = $conn->prepare("UPDATE attendances 
                            SET time_out = ?
                            WHERE student_id = ? AND date = ?
                          ");
    $stmt->bind_param(
      'sis', 
      $time_out,
      $student_id,
      $date  
    );
    
    if ($stmt->execute()) {
        // After successful time-out, send SMS to parent and log to notifications table
        $smsResult = sendParentDepartureSmsAndLog($conn, $student_id, $date, $time_out);
        echo json_encode([
          'success' => true,
          'messages' => 'Successfully logged out.',
          'notification' => $smsResult
        ]);
    } else {
        echo json_encode(['success' => false, 'messages' => 'Failed to log out.']);
    }

    $stmt->close();
  };


  function checkStudentAttendance($conn, $student_id, $date) {

    // CHECKING STUDENT IF ALREADY LOG IN
    $stmt = $conn->prepare("SELECT * FROM attendances WHERE student_id = ? AND date = ?");
    $stmt->bind_param('is', $student_id, $date);
    $stmt->execute();
    $result = $stmt->get_result();

    return $result;

    $stmt->close();
  }

  /**
   * Send SMS notification to parent/guardian when a student times OUT
   * and record the attempt in the `notifications` table.
   *
   * This mirrors the behavior of `sendParentArrivalSmsAndLog` used on time-in,
   * but with a different message indicating the student has left.
   */
  function sendParentDepartureSmsAndLog($conn, $student_id, $date, $time_out) {
    // Fetch student details and phone number (assumed parent's number)
    $studentStmt = $conn->prepare("SELECT first_name, last_name, middle_name, phone_number, section FROM students WHERE student_id = ? LIMIT 1");
    $studentStmt->bind_param('i', $student_id);
    $studentStmt->execute();
    $student = $studentStmt->get_result()->fetch_assoc();
    $studentStmt->close();

    if (!$student) {
        return ['status' => 'Pending', 'reason' => 'Student not found'];
    }

    $parentNumber = $student['phone_number'];
    $studentFullName = trim(
      $student['first_name'] . ' ' .
      ($student['middle_name'] ? $student['middle_name'] . ' ' : '') .
      $student['last_name']
    );

    // Compose message for time-out
    $message = "Cabangan HS: $studentFullName has timed-out and left the campus at $time_out on $date.";

    // Default as Pending; flip to Successful only if API confirms
    $finalStatus = 'Pending';

    if (!empty($parentNumber)) {
        // Call Semaphore API
        $apiUrl = 'https://semaphore.co/api/v4/messages';
        $payload = http_build_query([
            'apikey' => '0b403efb55c4ec8e5cfcf87d3bb1a984',
            'number' => $parentNumber,
            'message' => $message,
            // 'sendername' => 'CABANGANHS', // Optional if approved
        ]);

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $apiUrl);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curlErr = curl_error($ch);
        curl_close($ch);

        // Semaphore returns 200 and a JSON array of message status when accepted
        if ($httpCode === 200 && $response) {
            $decoded = json_decode($response, true);
            if (
              is_array($decoded) &&
              isset($decoded[0]['status']) &&
              in_array(strtolower($decoded[0]['status']), ['queued','pending','sent','success','delivered'])
            ) {
                $finalStatus = 'Successful';
            }
        }
    }

    // Insert into notifications table
    $timeOnly = $time_out;
    $insertOk = false;

    $insertStmt = $conn->prepare("INSERT INTO notifications (student_id, parents_number, messages, date, time, status) VALUES (?, ?, ?, ?, ?, ?)");
    $insertStmt->bind_param('isssss', $student_id, $parentNumber, $message, $date, $timeOnly, $finalStatus);
    if ($insertStmt->execute()) {
        $insertOk = true;
    }
    $insertStmt->close();

    if (!$insertOk) {
        // Fallback: try using section id if FK causes failure, same as time-in logic
        $sectionId = isset($student['section']) ? intval($student['section']) : 0;
        if ($sectionId > 0) {
            $fallbackStmt = $conn->prepare("INSERT INTO notifications (student_id, parents_number, messages, date, time, status) VALUES (?, ?, ?, ?, ?, ?)");
            $fallbackStmt->bind_param('isssss', $sectionId, $parentNumber, $message, $date, $timeOnly, $finalStatus);
            $fallbackStmt->execute();
            $fallbackStmt->close();
        }
    }

    return ['status' => $finalStatus];
  }
?>