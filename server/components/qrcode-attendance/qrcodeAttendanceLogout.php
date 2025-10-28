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
    $stmt->bind_param('sis', 
                        $time_out,
                        $student_id,
                        $date  
                      );
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'messages' => 'Successfully logged out.']);
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
?>