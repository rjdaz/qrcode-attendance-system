<?php
  include 'connection.php';
  include 'header.php';

  // files
  include '../components/login/login.php';
  include '../components/getClassesToday.php';
  include '../components/registerStudent.php';
  include '../components/getStudentStats.php';
  include '../components/getStudents.php';
  include '../components/updateStudent.php';
  include '../components/disableStudent.php';
  include '../components/enableStudent.php';

  $action = isset($_GET['action']) ? $_GET['action'] : '';

  switch ($action) {
    case 'login':
      login($conn);
    break;
    case 'getClassesToday':
      getClassesToday($conn);
    break;
    case 'registerStudent':
      registerStudent($conn);
    break;
    case 'getStudentStats':
      getStudentStats($conn);
    break;
    case 'getStudents':
      getStudents($conn);
    break;
    case 'updateStudent':
      updateStudent($conn);
    break;
    case 'disableStudent':
      disableStudent($conn);
    break;
    case 'enableStudent':
      enableStudent($conn);
    break;
    default:
      echo "Invalid action"; 
    break;
  }
?>