<?php
  function disableStudent($conn) {
    // Suppress PHP warnings to prevent HTML output
    error_reporting(0);
    ini_set('display_errors', 0);
    
    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    if ($method !== 'POST') {
      http_response_code(405);
      echo json_encode(["success" => false, "message" => "Method not allowed"]);
      return;
    }

    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (!is_array($data)) {
      echo json_encode(["success" => false, "message" => "Invalid JSON body"]);
      return;
    }

    // Get student ID (required)
    $student_id = $data['student_id'] ?? null;
    if (!$student_id) {
      echo json_encode(["success" => false, "message" => "Student ID is required"]);
      return;
    }

    try {
      // Check database connection
      if (!$conn || $conn->connect_error) {
        echo json_encode(["success" => false, "message" => "Database connection failed"]);
        return;
      }

      // Check if student exists
      $checkQuery = "SELECT student_id, status FROM students WHERE student_id = ?";
      $checkStmt = $conn->prepare($checkQuery);
      $checkStmt->bind_param('i', $student_id);
      $checkStmt->execute();
      $result = $checkStmt->get_result();
      
      if ($result->num_rows === 0) {
        $checkStmt->close();
        echo json_encode(["success" => false, "message" => "Student not found"]);
        return;
      }
      
      $student = $result->fetch_assoc();
      $checkStmt->close();

      // Check if student is already disabled
      if ($student['status'] === 'inactive') {
        echo json_encode(["success" => false, "message" => "Student is already disabled"]);
        return;
      }

      // Disable student
      $updateQuery = "UPDATE students SET status = 'inactive' WHERE student_id = ?";
      $stmt = $conn->prepare($updateQuery);
      
      if (!$stmt) {
        echo json_encode(["success" => false, "message" => "Prepare failed: " . $conn->error]);
        return;
      }

      $stmt->bind_param('i', $student_id);

      if ($stmt->execute()) {
        echo json_encode([
          "success" => true,
          "message" => "Student disabled successfully"
        ]);
      } else {
        echo json_encode([
          "success" => false,
          "message" => "Disable failed: " . $stmt->error
        ]);
      }

      $stmt->close();
    } catch (Exception $e) {
      echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
      ]);
    }
  }
?>
