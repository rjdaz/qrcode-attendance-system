<?php

    function getAllSection($conn) {

        $stmt = $conn->prepare("SELECT * FROM section");
        $stmt->execute();
        $result = $stmt->get_result();

        $allSection = [];

            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()){
                    $allSection[] = $row;
                }

                echo json_encode(['success' => true, 'allSection' => $allSection]);
            } else {
                echo json_encode(['success' => false, 'allSection' => [], 'message' => 'No Data Fetched!']);
            }
        $stmt->close();
    }
?>