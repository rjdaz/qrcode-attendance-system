<?php

  function getAllSubjectsData($conn) {

    $stmt = $conn->prepare("SELECT * FROM subjects");
    $stmt->execute();
    $result = $stmt->get_result();

    $subjectsData = [];

      if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
          $subjectsData[] = $row;
        }

        echo json_encode(['success' => true, 'subjectsData' => $subjectsData]);
      } else {
        echo json_encode(['success' => false, 'message' => 'No fetched data!']);
      }

    $stmt->close();
  }

?>