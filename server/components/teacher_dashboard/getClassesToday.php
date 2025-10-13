<?php

  function getClassesToday($conn) {
    $data = json_decode(file_get_contents("php://input"), true);

    $employeeNo = $data['teacherId'];
    date_default_timezone_set('Asia/Manila');
    $today = date('D');
    $likely = '%' . $today . '%';

    $stmt = $conn->prepare("SELECT * FROM subjects WHERE teacher_id = ? AND days LIKE ?");
    $stmt->bind_param("is", $employeeNo, $likely);
    $stmt->execute();
    $result = $stmt->get_result();

    if($result->num_rows > 0) {
        $classes = [];
        while($row = $result->fetch_assoc()) {
            $classes[] = $row;
        }
        echo json_encode(['success' => true, 'classes' => $classes, 'empNoResult' => $employeeNo]);
    } else {
        echo json_encode(['success' => false, 'message' => 'No classes found']);
    }
  
    
  }
?>