<?php

function getNotifications($conn) {
  // Fetch latest notifications with student name if possible
  $sql = "SELECT n.notification_id,
                 n.student_id,
                 n.parents_number,
                 n.messages,
                 n.date,
                 n.time,
                 n.status,
                 s.first_name,
                 s.middle_name,
                 s.last_name
          FROM notifications n
          LEFT JOIN students s ON s.student_id = n.student_id
          ORDER BY n.date DESC, n.time DESC, n.notification_id DESC
          LIMIT 200";

  $result = $conn->query($sql);
  $rows = [];
  if ($result) {
    while ($r = $result->fetch_assoc()) {
      $fullName = trim(($r['first_name'] ?? '') . ' ' . ($r['middle_name'] ? $r['middle_name'] . ' ' : '') . ($r['last_name'] ?? ''));
      $r['student_name'] = $fullName !== '' ? $fullName : null;
      $rows[] = $r;
    }
  }

  echo json_encode([ 'success' => true, 'data' => $rows ]);
}

?>

