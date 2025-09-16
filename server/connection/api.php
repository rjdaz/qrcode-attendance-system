<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

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
      //echo "Invalid action"; 
    break;
  }

  function login() {
    global $conn;

    $data = json_decode(file_get_contents("php://input"), true);

        // FIX: Check for missing credentials
    if (!$data || !isset($data['username']) || !isset($data['password'])) {
        echo json_encode(['success' => false, 'error' => 'Missing credentials']);
        return;
    }

    $username = $data['username'];
    $password = $data['password'];

   // echo "Received username: $username"; // FIX: Debugging line
   // echo "Received password: $password"; // FIX: Debugging line

     // Fetch the admin by username
    $stmt = $conn->prepare("SELECT * FROM admin WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();

        // Compare plain text password (not recommended for production)
        if ($password === $row['password']) {
            echo json_encode(['success' => true, 'message' => 'Login successful']);
        } else {
            echo json_encode(['success' => false, 'error' => 'Invalid password']);
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'Invalid username']);
    }
    $stmt->close();
  }
?>