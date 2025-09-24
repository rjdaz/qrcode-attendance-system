<?php
  function registerStudent($conn) {
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

    // Simple required fields based on students table
    $roll_number = trim($data['roll_number'] ?? '');
    $first_name = trim($data['first_name'] ?? '');
    $last_name = trim($data['last_name'] ?? '');
    $enrollment_date = trim($data['enrollment_date'] ?? '');
    $grade_level = $data['grade_level'] ?? null;
    $section = $data['section'] ?? null;

    if ($roll_number === '' || $first_name === '' || $last_name === '' || $enrollment_date === '' || $grade_level === null || $section === null) {
      echo json_encode(["success" => false, "message" => "Missing required fields"]);
      return;
    }

    $middle_name = trim($data['middle_name'] ?? '');
    $email = trim($data['email'] ?? '');
    $phone_number = trim($data['phone_number'] ?? '');
    $date_of_birth = trim($data['date_of_birth'] ?? '');
    $gender = trim($data['gender'] ?? '');
    $address = trim($data['address'] ?? '');
    $status = trim($data['status'] ?? 'active');
    $organization_id = $data['organization_id'] ?? null; // nullable

    // Prepared statement to avoid SQL injection
    $stmt = $conn->prepare("INSERT INTO students (roll_number, first_name, last_name, middle_name, email, phone_number, date_of_birth, gender, address, enrollment_date, status, grade_level, section, organization_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

    if (!$stmt) {
      echo json_encode(["success" => false, "message" => "Prepare failed: " . $conn->error]);
      return;
    }

    // Bind parameters (s = string, i = integer)
    $stmt->bind_param(
      'sssssssssssiii',
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
      $organization_id
    );

    if ($stmt->execute()) {
      echo json_encode([
        "success" => true,
        "message" => "Student registered successfully",
        "student_id" => $stmt->insert_id
      ]);
    } else {
      // Common duplicate errors (e.g., roll_number/email unique)
      echo json_encode([
        "success" => false,
        "message" => "Insert failed: " . $stmt->error
      ]);
    }

    $stmt->close();
  }
?>


