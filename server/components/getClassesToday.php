<?php

  function getClassesToday($conn) {
    $data = json_decode(file_get_contents("php://input"), true);

    $employeeNo = $data['employeeNo'];
    $today = date('D');
    $likely = '%' . $today . '%';

    
    $getIdNoStmt = $conn->prepare("SELECT users_id FROM users WHERE employee_no = ?");
    $getIdNoStmt->bind_param("s", $employeeNo);
    $getIdNoStmt->execute();
    $empNoResult = $getIdNoStmt->get_result();
    $empNoResult = $empNoResult->fetch_assoc()['users_id'];
    $getIdNoStmt->close();

    $stmt = $conn->prepare("SELECT * FROM subjects WHERE teacher_id = ? AND days LIKE ?");
    $stmt->bind_param("ss", $empNoResult, $likely);
    $stmt->execute();
    $result = $stmt->get_result();

    if($result->num_rows > 0) {
        $classes = [];
        while($row = $result->fetch_assoc()) {
            $classes[] = $row;
        }
        echo json_encode(['success' => true, 'classes' => $classes, 'empNoResult' => $empNoResult]);
    } else {
        echo json_encode(['success' => false, 'message' => 'No classes found']);
    }

  }
?>