<?php

  echo "connectedddd";

function processLogin($conn) {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    echo "<br>";
    echo "Username: " . $username . "<br>";
    echo "Password: " . $password . "<br>";

    if (!$username || !$password) {
        echo json_encode(['success' => false, 'error' => 'Missing credentials']);
        return;
    }

    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ? AND password = ?");
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(array('success' => true, 'message' => 'Login successful', 'user' => $row));
    } else {
        echo json_encode(array('success' => false, 'error' => 'Invalid username or password'));
    }

    // $data = json_decode(file_get_contents('php://input'), true);

    // $username = $data['username'];
    // $password = $data['password'];

    // //get username
    // $stsmtgetuser = $conn->prepare("SELECT * FROM admin WHERE username = 'admin'");
    // $stsmtgetuser->execute();
    // $results = $stsmtgetuser->get_result();
    // $row = $results->fetch_assoc();
    // $dbusername = $row['username'];
    // $dbpassword = $row['password'];
    // $stsmtgetuser->close();

    // // display echo
    // echo "Username: " . $dbusername . "<br>";
    // echo "Password: " . $dbpassword . "<br>";

    // // fetch
    // $stmt = $conn->prepare("SELECT * FROM admin WHERE username = ?");
    // $stmt->bind_param("s", $username);
    // $stmt->execute();
    // $result = $stmt->get_result();

    // if ($result->num_rows > 0) {
    //         $row = $result->fetch_assoc();

    //         // Verify the password using password_verify
    //         if (password_verify($password, $row['password'])) {
    //             echo json_encode(['success' => true, 'user' => $row['position']]);
    //         } else {
    //             echo json_encode(['error' => 'Invalid password']);
    //         }
    //     } else {
    //         echo json_encode(['error' => 'Invalid username']);
    //     }
    //     $stmt->close();
}

processLogin($conn);
$conn->close();
?>