<?php

  function getInnerJoinAttAndStdnts($conn) {

    $data = json_decode(file_get_contents("php://input"), true);

    $sectionId = $data['sectionId'];
    $date = $data['date'];

    $stmt = $conn->prepare("SELECT 
            a.attendance_id,
            s.student_id,
            s.section AS section_id,
            s.roll_number,
            s.first_name,
            s.last_name,
            s.middle_name,
            s.gender,
            a.date,
            a.time_in,
            a.time_out,
            a.status
          FROM students s
          LEFT JOIN attendances a 
            ON s.student_id = a.student_id 
            AND a.date = ?
          WHERE s.section = ?
    ");

    $stmt->bind_param('si', $date, $sectionId);
    $stmt->execute();
    $result = $stmt->get_result();

    $mergeData = [];

      if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
          $mergeData[] = $row;
        }

        echo json_encode(['success' => true, 'currentAttendances' => $mergeData]);
      } else {
        echo json_encode(['success' => false, 'currentAttendances' => [], 'messages' => 'No Data fetched!']);
      }

    $stmt->close();
  };

?>