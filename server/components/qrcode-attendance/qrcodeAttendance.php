<?php 

  function qrcodeAttendance($conn) {

    $data = json_decode(file_get_contents("php://input"), true);

    // get all student data
    $getStudentsStmt = $conn->prepare("SELECT * FROM students");
    $getStudentsStmt->execute();
    $studetsResult = $getStudentsStmt->get_result();

    $students = [];

      if ($studentsResult->num_rows > 0) {
          while ($row = $studentsResult->fetch_assoc()) {
              $students[] = $row;
          }

      echo json_encode(['success' => true, 'studentsData' => $students]);
      }

    $getStudentsStmt->close();
  }
?>