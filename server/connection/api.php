<?php
  include 'connection.php';
  include 'header.php';

  // files
  include '../components/login.php';

  $action = isset($_GET['action']) ? $_GET['action'] : '';

  switch ($action) {
    case 'login':
      login($conn);
    break;
    default:
      echo "Invalid action"; 
    break;
  }
?>