<?php
  function getStudents($conn) {
    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    if ($method !== 'GET') {
      http_response_code(405);
      echo json_encode(["success" => false, "message" => "Method not allowed"]);
      return;
    }

    try {
      // Get students with their section and grade level information
      $query = "SELECT 
                  s.student_id,
                  s.roll_number,
                  s.first_name,
                  s.last_name,
                  s.middle_name,
                  s.email,
                  s.phone_number,
                  s.date_of_birth,
                  s.gender,
                  s.address,
                  s.enrollment_date,
                  s.status,
                  s.grade_level,
                  s.section,
                  s.organization_id,
                  sec.section_name,
                  gl.grade_name
                FROM students s
                LEFT JOIN section sec ON s.section = sec.section_id
                LEFT JOIN gradelevel gl ON s.grade_level = gl.grade_level_id
                ORDER BY s.last_name, s.first_name";

      $result = $conn->query($query);
      
      if (!$result) {
        echo json_encode([
          "success" => false,
          "message" => "Database query failed: " . $conn->error
        ]);
        return;
      }

      $students = [];
      while ($row = $result->fetch_assoc()) {
        $students[] = [
          "student_id" => $row['student_id'],
          "roll_number" => $row['roll_number'],
          "first_name" => $row['first_name'],
          "last_name" => $row['last_name'],
          "middle_name" => $row['middle_name'],
          "name" => trim($row['first_name'] . ' ' . $row['middle_name'] . ' ' . $row['last_name']),
          "email" => $row['email'],
          "phone_number" => $row['phone_number'],
          "date_of_birth" => $row['date_of_birth'],
          "gender" => $row['gender'],
          "address" => $row['address'],
          "enrollment_date" => $row['enrollment_date'],
          "status" => $row['status'],
          "grade_level" => $row['grade_level'],
          "section" => $row['section'],
          "organization_id" => $row['organization_id'],
          "section_display" => $row['section_name'] ? $row['grade_name'] . ' - ' . $row['section_name'] : 'No Section',
          "guardian" => $row['phone_number'] ? $row['phone_number'] : 'No Contact',
          "status_display" => ucfirst($row['status'])
        ];
      }

      echo json_encode([
        "success" => true,
        "data" => $students
      ]);

    } catch (Exception $e) {
      echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
      ]);
    }
  }
?>
