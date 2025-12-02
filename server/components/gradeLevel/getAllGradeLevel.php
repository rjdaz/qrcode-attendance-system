<?php

    function getAllGradeLevel($conn) {

        $stmt = $conn->prepare("SELECT * FROM gradelevel");
        $stmt->execute();
        $result = $stmt->get_result();

        $allGradeLevel = [];

            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()){
                    $allGradeLevel[] = $row;
                }
                
                echo json_encode(['success' => true, 'gradelevels' => $allGradeLevel]);
            } else {
                echo json_encode(['success' => false, 'gradelevels' => [], 'message' => 'No data fetched!']);
            }
        
        $stmt->close();
    }
?>
