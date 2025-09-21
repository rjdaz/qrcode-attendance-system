<?php

  function getClassesToday($conn) {
    $data = json_decode(file_get_contents("php://input"), true);

    $employeeNo = $data['employeeNo'];

    $stmt = $conn->prepare("SELECT * FROM subjects WHERE employee_no = ? AND day = DAYNAME(CURDATE())");
  }
?>