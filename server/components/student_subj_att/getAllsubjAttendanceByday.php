<?php

  function getAllsubjAttendanceByday($conn) {

  $data = json_decode(file_get_contents("php://input"), true);

  // Move the validation BEFORE using $data['date']
  if (!isset($data['date']) || empty($data['date'])) {
    echo json_encode(['success' => false, 'message' => 'Date is required.']);
    return;
  }

  $date = $data['date'];  // Move this AFTER validation

    $stmt = $conn->prepare("SELECT * 
                            FROM attendances_per_subject
                            WHERE `date` = ?

    ");
    $stmt->bind_param('s', $date);
    $stmt->execute();
    $result = $stmt->get_result();

    $subjAttendance = [];

      if($result->num_rows > 0) {
        while($row = $result->fetch_assoc()){
          $subjAttendance[] = $row;
        }

        echo json_encode(['success' => true, 'subjAttendance' => $subjAttendance]);
      } else {
        echo json_encode(['success' => false, 'message' => 'No attendance records found for today.']);
      }

    $stmt->close();
  }
?>