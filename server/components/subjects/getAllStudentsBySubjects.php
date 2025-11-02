<?php

  function getAllStudentsBySubjects($conn) {
        
    $data = json_decode(file_get_contents("php://input"), true);

    $section_id = $data['getSubjectId'];

$stmt = $conn->prepare("SELECT DISTINCT
                          st.student_id,
                          st.first_name,
                          st.last_name,
                          st.middle_name,
                          st.gender,
                          st.email,
                          st.roll_number,
                          sb.subject_id,
                          sb.subject_code,
                          sb.subject_name,
                          sb.teacher_id
                        FROM students st
                        INNER JOIN subjects sb ON st.section = sb.section_id
                        WHERE sb.subject_id = ?
                        GROUP BY st.student_id
");
    $stmt->bind_param('i', $section_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $studentsSubject = [];

      if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
          $studentsSubject[] = $row;
        }

        echo json_encode(['success' => true, 'studentSubject' => $studentsSubject]);
      } else {
        echo json_encode(['success' => false, 'message' => 'No fetched Data!', 'studentSubject' => []]);
      }

    $stmt->close();
  }

?>