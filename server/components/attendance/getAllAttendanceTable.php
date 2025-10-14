<?php 

  function getAllAttendanceTable($conn) {

    $data = json_decode(file_get_contents("php://input"), true);

    $stmt = $conn->prepare("SELECT * FROM attendances WHERE 1");
    $stmt->execute();
    $result = $stmt->get_result();

    $allAttendances = [];

      if($result->num_rows > 0) {
        while($row = $result->fetch_assoc()){
          $allAttendances[] = $row;
        }
        
        echo json_encode(['success' => true, 'attendancesData' => $allAttendances]);
      } else {
        echo json_encode(['succes' => false, 'attendancesData' => []]);
      }

    $stmt->close();
  }

?>