<?php

    function getAllTeachersData($conn) {

        $stmt = $conn->prepare("SELECT * FROM users WHERE position = 'Teacher'");
        $stmt->execute();
        $result = $stmt->get_result();

        $allTeachers = [];

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()){
                $allTeachers[] = $row;
            }

            echo json_encode(['success' => true, 'allTeachers' => $allTeachers]);
        } else {
            echo json_encode(['success' => false, 'message' => 'No Data Fetched!']);
        }

        $stmt->close();
    }

?>