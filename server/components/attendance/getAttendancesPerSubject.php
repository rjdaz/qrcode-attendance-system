<?php
  function getAttendancesPerSubject($conn) {
    header('Content-Type: application/json; charset=utf-8');

    try {
      // Optional filters
      $date = isset($_POST['date']) ? $_POST['date'] : null;

      $sql = "SELECT aps.attendances_subjects_id,
                     aps.student_id,
                     aps.subject_id,
                     aps.teacher_id,
                     aps.date,
                     aps.time,
                     aps.status,
                     s.roll_number,
                     s.first_name,
                     s.last_name,
                     s.middle_name,
                     sub.subject_code,
                     sub.subject_name,
                     sub.section_id
              FROM attendances_per_subject aps
              LEFT JOIN students s ON s.student_id = aps.student_id
              LEFT JOIN subjects sub ON sub.subject_id = aps.subject_id";

      if ($date) {
        $sql .= " WHERE aps.date = ?";
      }
      $sql .= " ORDER BY aps.date DESC, aps.time DESC";

      if ($date) {
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $date);
      } else {
        $stmt = $conn->prepare($sql);
      }

      if (!$stmt->execute()) {
        echo json_encode([ 'success' => false, 'message' => 'Query failed' ]);
        return;
      }

      $result = $stmt->get_result();
      $rows = [];
      while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
      }

      echo json_encode([
        'success' => true,
        'data' => $rows
      ]);
    } catch (Exception $e) {
      echo json_encode([
        'success' => false,
        'message' => 'Server error',
      ]);
    }
  }
?>


