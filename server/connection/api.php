<?php
  include 'connection.php';
  include 'header.php';

  // files
    // log in
      include '../components/login/login.php';
    // teacher info
      include '../components/teacher_dashboard/getClassesToday.php';
      include '../components/teacher_dashboard/getClassAdvisorData.php';
      include '../components/teacher_dashboard/getStudentsInSection.php';
    // student info
      include '../components/admin_dashboard/student/registerStudent.php';
      include '../components/admin_dashboard/student/getStudentStats.php';
      include '../components/admin_dashboard/student/getStudents.php';
      include '../components/admin_dashboard/student/updateStudent.php';
      include '../components/admin_dashboard/student/disableStudent.php';
      include '../components/admin_dashboard/student/enableStudent.php';
      include '../components/students/getAllStudentsData.php';
    // qrcode attendance
      include '../components/qrcode-attendance/qrcodeAttendance.php';

  $action = isset($_GET['action']) ? $_GET['action'] : '';

  switch ($action) {
    case 'login': // log in
      login($conn);
    break;
    // teacher info
    case 'getClassesToday': //get all classes for today
      getClassesToday($conn);
    break;
    case 'getClassAdvisorData': // get class advisor data
      getClassAdvisorData($conn);
    break;
    case 'getStudentsInSection': // get students in section
      getStudentsInSection($conn);
    break;
    // student info
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
    case 'getAllStudentsData':
      getAllStudentsData($conn);
    break;
    // qrcode attendance
    case 'qrcodeAttendance':
      qrcodeAttendance($conn);
    break;
    default:
      echo "Invalid action"; 
    break;
  }
?>