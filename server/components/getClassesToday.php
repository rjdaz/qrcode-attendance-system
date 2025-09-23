<?php

  function getClassesToday($conn) {
    $data = json_decode(file_get_contents("php://input"), true);

    $employeeNo = $data['employeeNo'];
    $today = date('D');

    $likely = '%' . $today . '%';

    $stmt = $conn->prepare("SELECT * FROM subjects WHERE employee_no = ? AND days LIKE ?");
    $stmt->bind_param("ss", $employeeNo, $likely);
    $stmt->execute();
    $result = $stmt->get_result();

    if($result->num_rows > 0) {
        $classes = [];
        while($row = $result->fetch_assoc()) {
            $classes[] = $row;
        }
        echo json_encode(['success' => true, 'classes' => $classes]);
    } else {
        echo json_encode(['success' => false, 'message' => 'No classes found']);
    }

  }
?>