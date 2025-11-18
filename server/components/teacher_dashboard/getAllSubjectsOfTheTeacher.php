<?php

  function getAllSubjectsOfTheTeacher($conn) {

    $data = json_decode(file_get_contents("php://input"),true);

    $userId = $data['userId'];

    $stmt = $conn->prepare("SELECT * FROM subjects WHERE teacher_id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    $allSubjects = [];
      
      if($result->num_rows > 0) {
        while($row = $result->fetch_assoc()){
          $allSubjects[] = $row;
        }

        echo json_encode(['success' => true, 'allSubjects' => $allSubjects]);
      } else {
        echo json_encode(['success' => false, 'message' => 'No classes found']);
      }
    
    $stmt->close();
  }

?>