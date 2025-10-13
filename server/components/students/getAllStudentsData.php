<?php

  function getAllStudentsData($conn) {

    $data = json_decode(file_get_contents("php://input"), true);

    
    // get all student data
    $getStudentsStmt = $conn->prepare("SELECT * FROM students");
    $getStudentsStmt->execute();
    $studentResult = $getStudentsStmt->get_result();

    $students = [];

      if ($studentResult->num_row > 0) {
        while ($row = $studentResult->fetch_assoc()) {
            $students[] = $row;
        }
      
        echo json_encode(['success' => true, 'studentsData' => $students]);
      }
    
    $getStudentsStmt->close();
  }
?>