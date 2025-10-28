<?php

function login($conn) {
    
    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data || !isset($data['username']) || !isset($data['password'])) {
        echo json_encode(['success' => false, 'error' => 'Missing credentials']);
        return;
    }

    $username = $data['username'];
    $password = $data['password'];

    // Fetch the user by username
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    // to update the password 
    /* $newpw = password_hash('staff', PASSWORD_BCRYPT);
    $updateStmt = $conn->prepare("UPDATE users SET password = ? WHERE username = ?");
    $updateStmt->bind_param("ss", $newpw, $username);
    $updateStmt->execute();
    $updateStmt->close(); */

    // Check if user exists 

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        
        // verify password
        if (password_verify($password, $row['password'])) {

            //get section id
            $getSectionIdStmt = $conn->prepare("SELECT section_id FROM section WHERE adviser_teacher_id = ?");
            $getSectionIdStmt->bind_param("i", $row['users_id']);
            $getSectionIdStmt->execute();
            $sectionResult = $getSectionIdStmt->get_result();

                if ($sectionResult->num_rows > 0) {
                    $sectionRow = $sectionResult->fetch_assoc();
                    $sectionId = $sectionRow['section_id'];
                } else {
                    $sectionId = null; // No section found
                }

            echo json_encode(['success' => true, 'message' => 'Login successful', 'name' => $row['first_name'], 'department' => $row['department_id'], 'role' => $row['organization_id'], 'employeeNo' => $row['employee_no'], 'userId' => $row['users_id'], 'sectionId' => $sectionId]);

                // update the last_login time 
                $updateStmt = $conn->prepare("UPDATE users SET last_login = NOW() WHERE username = ?");
                $updateStmt->bind_param("s", $username);
                $updateStmt->execute();

                $updateStmt->close();
            $getSectionIdStmt->close();
        } else {
            echo json_encode(['success' => false, 'error' => 'Invalid password']);
        }
    } else {
        echo json_encode(['success' => false, 'errorUname' => 'Invalid username']);
    }
    $stmt->close();
  }