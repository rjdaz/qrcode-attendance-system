<?php
  function getStudentStats($conn) {
    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    if ($method !== 'GET') {
      http_response_code(405);
      echo json_encode(["success" => false, "message" => "Method not allowed"]);
      return;
    }

    try {
      // Get total active students
      $activeQuery = "SELECT COUNT(*) as active_count FROM students WHERE status = 'active'";
      $activeResult = $conn->query($activeQuery);
      $activeCount = $activeResult->fetch_assoc()['active_count'];

      // Get total inactive students
      $inactiveQuery = "SELECT COUNT(*) as inactive_count FROM students WHERE status = 'inactive'";
      $inactiveResult = $conn->query($inactiveQuery);
      $inactiveCount = $inactiveResult->fetch_assoc()['inactive_count'];

      // Get students with attendance issues (students who are active but might have attendance problems)
      // For now, we'll use a simple count of active students as a placeholder
      // You can modify this query based on your attendance tracking logic
      $issuesQuery = "SELECT COUNT(*) as issues_count FROM students WHERE status = 'active'";
      $issuesResult = $conn->query($issuesQuery);
      $issuesCount = $issuesResult->fetch_assoc()['issues_count'];

      echo json_encode([
        "success" => true,
        "data" => [
          "active" => (int)$activeCount,
          "inactive" => (int)$inactiveCount,
          "withAttendanceIssues" => (int)$issuesCount
        ]
      ]);

    } catch (Exception $e) {
      echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
      ]);
    }
  }
?>
