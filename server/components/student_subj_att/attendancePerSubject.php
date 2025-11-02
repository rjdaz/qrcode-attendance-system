<?php

  function attendancePerSubject($conn) {
    header('Content-Type: application/json; charset=utf-8');

    try {
      $data = json_decode(file_get_contents("php://input"), true);
      if (!$data) {
        echo json_encode(['success' => false, 'message' => 'Invalid payload']);
        return;
      }

      $studentId = isset($data['studentId']) ? intval($data['studentId']) : null;
      $subjectId = isset($data['subjectId']) ? intval($data['subjectId']) : null;
      $teacherId = isset($data['teacherId']) ? intval($data['teacherId']) : null;
      $sectionId = isset($data['sectionId']) ? intval($data['sectionId']) : null;
      $date = isset($data['date']) ? $data['date'] : null; // expects YYYY-MM-DD
      $status = isset($data['status']) ? $data['status'] : 'Present';

      if (!$studentId || !$subjectId || !$teacherId || !$date) {
        echo json_encode(['success' => false, 'message' => 'Missing required fields']);
        return;
      }

      // Prevent duplicate entries for same student/subject/date
      $check = $conn->prepare("SELECT 1 FROM attendances_per_subject WHERE student_id = ? AND subject_id = ? AND date = ? LIMIT 1");
      $check->bind_param('iis', $studentId, $subjectId, $date);
      $check->execute();
      $checkRes = $check->get_result();
      if ($checkRes && $checkRes->num_rows > 0) {
        echo json_encode(['success' => true, 'message' => 'Already recorded']);
        return;
      }

      // Insert with current server time
      $stmt = $conn->prepare("INSERT INTO attendances_per_subject (student_id, subject_id, teacher_id, section_id, date, time, status) VALUES (?, ?, ?, ?, ?, CURRENT_TIME(), ?)");
      $stmt->bind_param('iiiiss', $studentId, $subjectId, $teacherId, $sectionId, $date, $status);
      if (!$stmt->execute()) {
        echo json_encode(['success' => false, 'message' => 'Insert failed']);
        return;
      }

      echo json_encode(['success' => true, 'message' => 'Recorded successfully']);
    } catch (Exception $e) {
      echo json_encode(['success' => false, 'message' => 'Server error']);
    }
  }
  
?>