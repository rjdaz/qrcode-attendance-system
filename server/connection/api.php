<?php
  include 'connection.php';
  include 'header.php';

  // files
  include '../components/login/login.php';
  include '../components/teacher_dashboard/getClassesToday.php';
  include '../components/admin_dashboard/student/registerStudent.php';
  include '../components/admin_dashboard/student/getStudentStats.php';
  include '../components/admin_dashboard/student/getStudents.php';
  include '../components/admin_dashboard/student/updateStudent.php';
  include '../components/admin_dashboard/student/disableStudent.php';
  include '../components/admin_dashboard/student/enableStudent.php';

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