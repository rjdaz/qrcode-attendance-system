<?php
  function updateStudent($conn) {
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

    // Validate required fields
    if (empty($data['roll_number']) || empty($data['first_name']) || empty($data['last_name'])) {
      echo json_encode(["success" => false, "message" => "Roll number, first name, and last name are required"]);
      return;
    }

    // Get updated fields
    $roll_number = trim($data['roll_number'] ?? '');
    $first_name = trim($data['first_name'] ?? '');
    $last_name = trim($data['last_name'] ?? '');
    $middle_name = trim($data['middle_name'] ?? '');
    $email = trim($data['email'] ?? '');
    $phone_number = trim($data['phone_number'] ?? '');
    $date_of_birth = trim($data['date_of_birth'] ?? '');
    $gender = trim($data['gender'] ?? '');
    $address = trim($data['address'] ?? '');
    $enrollment_date = trim($data['enrollment_date'] ?? '');
    $status = trim($data['status'] ?? '');
    $grade_level = $data['grade_level'] ?? null;
    $section = $data['section'] ?? null;
    $organization_id = $data['organization_id'] ?? null;

    try {
      // Check database connection
      if (!$conn || $conn->connect_error) {
        echo json_encode(["success" => false, "message" => "Database connection failed"]);
        return;
      }

      // Check if student exists
      $checkQuery = "SELECT student_id FROM students WHERE student_id = ?";
      $checkStmt = $conn->prepare($checkQuery);
      $checkStmt->bind_param('i', $student_id);
      $checkStmt->execute();
      $result = $checkStmt->get_result();
      
      if ($result->num_rows === 0) {
        $checkStmt->close();
        echo json_encode(["success" => false, "message" => "Student not found"]);
        return;
      }
      $checkStmt->close();

      // Update student information
      $updateQuery = "UPDATE students SET 
                      roll_number = ?, 
                      first_name = ?, 
                      last_name = ?, 
                      middle_name = ?, 
                      email = ?, 
                      phone_number = ?, 
                      date_of_birth = ?, 
                      gender = ?, 
                      address = ?, 
                      enrollment_date = ?, 
                      status = ?, 
                      grade_level = ?, 
                      section = ?, 
                      organization_id = ?
                      WHERE student_id = ?";

      $stmt = $conn->prepare($updateQuery);
      if (!$stmt) {
        echo json_encode(["success" => false, "message" => "Prepare failed: " . $conn->error]);
        return;
      }

      $stmt->bind_param(
        'sssssssssssiiii',
        $roll_number,
        $first_name,
        $last_name,
        $middle_name,
        $email,
        $phone_number,
        $date_of_birth,
        $gender,
        $address,
        $enrollment_date,
        $status,
        $grade_level,
        $section,
        $organization_id,
        $student_id
      );

      if ($stmt->execute()) {
        echo json_encode([
          "success" => true,
          "message" => "Student updated successfully"
        ]);
      } else {
        echo json_encode([
          "success" => false,
          "message" => "Update failed: " . $stmt->error
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
