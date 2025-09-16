<?php

  include 'connection.php';
  include 'header.php';

  // files
  //include '../components/login.php';

  $action = isset($_GET['action']) ? $_GET['action'] : '';

  switch ($action) {
    case 'login':
      login();
    break;
    default:
      echo "Invalid action"; 
    break;
  }

  function login() {
    global $conn;

    $data = json_decode(file_get_contents("php://input"), true);

    $username = $data['username'];
    $password = $data['password'];

     // Fetch the admin by username
    $stmt = $conn->prepare("SELECT * FROM admin WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();

        // Verify the password using password_verify
        if (password_verify($password, $row['password'])) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['error' => 'Invalid password']);
        }
    } else {
        echo json_encode(['error' => 'Invalid username']);
    }
    $stmt->close();
  }
?>