<?php

function getUserData($conn) {

  $stmt = $conn->prepare("SELECT * FROM users");
  $stmt->execute();
  $result = $stmt->get_result();

  $usersData = [];

  if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
      $usersData[] = $row;
    }

    echo json_encode([
      'success' => true,
      'userData' => $usersData
    ]);
  } else {
    echo json_encode([
      'success' => false,
      'message' => 'No fetching data!'
    ]);
  }

  $stmt->close();
}
?>
