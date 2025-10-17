<?php

  function sortingSubjectsBySection($conn) {

    $data = json_decode(file_get_contents("php://input"), true);

    $sectionId = $data['sectionId'];

    $stmt = $conn->prepare("SELECT * 
                            FROM subjects
                            WHERE section_id = ?
    ");
    $stmt->bind_param('i', $sectionId);
    $stmt->execute();
    $result = $stmt->get_result();

    $subjectsData = [];

      if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()){
          $subjectsData[] = $row;
        }

        echo json_encode(['success' => true, 'subjectsData' => $subjectsData]);
      } else {
        echo json_encode(['success' => false, 'subjectsData' => [], 'messages' => 'No fetching Data!']);
      }
      
    $stmt->close();
  };

?>