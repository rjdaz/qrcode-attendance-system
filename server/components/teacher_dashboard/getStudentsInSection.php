<?php

  function getStudentsInSection($conn) {

    $data = json_decode(file_get_contents("php://input"), true);

    $sectionId = $data['sectionId'];

    // get the all data based on the sectionId

    $getStudentsStmt = $conn->prepare("SELECT * FROM students WHERE section = ?");
    $getStudentsStmt->bind_param("i", $sectionId);
    $getStudentsStmt->execute();
    $result = $getStudentsStmt->get_result();

      if($result->num_rows > 0) {
        $students = [];
          while($row = $result->fetch_assoc()) {
          $students[] = $row;
        }
  
        echo json_encode([
          'success' => true,
          'sectionId' => $sectionId,
          'studentsdata' => $students
        ]);
      }else {
        echo json_encode([
          'success' => false,
          'sectionId' => $sectionId,
          'studentsdata' => []
        ]);
      }



    $getStudentsStmt->close();
   }
?>