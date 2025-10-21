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
    // attendance table
      include '../components/attendance/getAllAttendanceTable.php';
      include '../components/attendance/getInnerJoinAttAndStdnts.php';
    // subjects
      include '../components/subjects/sortingSubjectsBySection.php';
      include '../components/subjects/getAllSubjectsData.php';
      include '../components/subjects/getAllStudentsBySubjects.php';
    // users
      include '../components/users_data/getUserData.php';

  $action = isset($_GET['action']) ? $_GET['action'] : '';

  switch ($action) {
    case 'getUserData':
      getUserData($conn);
    break;
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
    // attendance table
    case 'getAllAttendanceTable':
      getAllAttendanceTable($conn);
    break;
    case 'getInnerJoinAttAndStdnts':
      getInnerJoinAttAndStdnts($conn);
    break;
    //subjects
    case 'sortingSubjectsBySection':
      sortingSubjectsBySection($conn);
    break;
    case 'getAllSubjectData':
      getAllSubjectsData($conn);
    break;
    case 'getAllStudentsBySubjects':
      getAllStudentsBySubjects($conn);
    break;
    default:
      echo "Invalid action"; 
    break;
  }
?>