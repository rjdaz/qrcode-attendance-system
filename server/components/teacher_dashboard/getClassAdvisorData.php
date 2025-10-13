<?php
  function getClassAdvisorData($conn) {

    $data = json_decode(file_get_contents("php://input"), true);

    $userId = $data['userId'];

  // get the data based on userId
    $getIdNoStmt = $conn->prepare("SELECT * FROM section WHERE adviser_teacher_id = ?");
    $getIdNoStmt->bind_param("s", $userId);
    $getIdNoStmt->execute();
    $empNoResult = $getIdNoStmt->get_result();

      if($empNoResult->num_rows > 0) {
        $sectionData = $empNoResult->fetch_assoc();
        echo json_encode(['success' => true, 'sectionData' => $sectionData, 'sectionId' => $sectionData['section_id']]);

      }else {
        echo json_encode(['success' => false, 'message' => 'No section found']);
      }

    $getIdNoStmt->close();

  }
?>