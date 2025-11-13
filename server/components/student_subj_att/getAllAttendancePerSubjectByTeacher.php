<?php
  
  function getAllAttendancePerSubjectByTeacher($conn) {

    $data = json_decode(file_get_contents("php://input"), true);

    $teacherId = $data['teacherId'];

    $stmt = $conn->prepare("SELECT aps.*, 
                            s.subject_code,
                            s.subject_name                   
        FROM attendances_per_subject aps
        JOIN subjects s ON aps.subject_id = s.subject_id
        WHERE aps.teacher_id = ?
        GROUP BY aps.date, aps.subject_id
        ORDER BY aps.date DESC, aps.time DESC
    ");
    $stmt->bind_param('i', $teacherId);
    $stmt->execute();
    $result = $stmt->get_result();

    $attendancesByTeacher = [];

    if ($result->num_rows > 0) {
      while ($row = $result->fetch_assoc()) {
        $attendancesByTeacher[] = $row;
      }

      echo json_encode(['success' => true, 'attendancesByTeacher' => $attendancesByTeacher]);
    } else {
      echo json_encode(['success' => false, 'attendancesByTeacher' => [], 'message' => 'No attendance records found for this teacher.']);
    }

    $stmt->close();
  }
?>