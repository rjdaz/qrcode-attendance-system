<?php 

// INSERT DATA
function qrcodeAttendance($conn) {

    date_default_timezone_set("Asia/Manila");

    $data = json_decode(file_get_contents("php://input"), true);

    $student_id = $data['student_id'];
    $section_id = $data['section_id'];
    $date = date("Y-m-d");
    $time_in = date("H:i:s");
    $status = $data['status'];
    
    $checkResult = checkStudentAttendace($conn, $student_id, $date);

    if ($checkResult->num_rows > 0) {
        echo json_encode(['success' => true, 'messages' => 'Your are Already Log in']);

        return;
    }

    $stmt = $conn->prepare("INSERT INTO attendances 
                            (student_id, section_id, date, time_in, status)
                            VALUES 
                            (?, ?, ?, ?, ?)");
    $stmt->bind_param('issss', $student_id, $section_id, $date, $time_in, $status);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'messages' => 'successfully log in!']);
        } else {
            echo json_encode(['success' => false, 'messages' => 'Fail to log in!']);
        }
    
    $stmt->close();
}

// CHECK STUDENT ATTENDANCE
function checkStudentAttendace ($conn, $student_id, $date) {

    // CHECKING STUDENT IF ALREADY LOG IN
    $stmt = $conn->prepare("SELECT * FROM attendances WHERE student_id = ? AND date = ?");
    $stmt->bind_param('is', $student_id, $date);
    $stmt->execute();
    $result = $stmt->get_result();

    return $result;

    $stmt->close();
}
?>
