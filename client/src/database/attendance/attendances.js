import axios from "axios";

// fetching all attedances table data
export const getAllattendanceTable = async (apiUrl, setAllAttendance) => {
  const url = `${apiUrl}getAllAttendanceTable`;

  try {
    const responce = await axios.get(url);

    if (responce.data.success) {
      setAllAttendance(responce.data.attendancesData);  
    } else {
      console.log("No fetching Data");
    }
  } catch (err) {
    console.error("Error fetching attedances data:", err);
  }
};

// join the attendances and students datas
export const innerJoinAttAndStdntsData = async (
  apiUrl,
  setAllAttendances,
  sectionId,
  date
) => {
  const url = `${apiUrl}getInnerJoinAttAndStdnts`;

  try {
    const response = await axios.post(url, {
      sectionId,
      date,
    });

    console.log(response.data)

    if (response.data.success) {
      setAllAttendances(response.data.currentAttendances);
    } else {
      console.log("No fetching Data");
    }
  } catch (err) {
    console.error("Error fetching attedances data:", err);
  }
};

// get attendance per subject
export const fetchAttendancesPerSubject = async (apiUrl, setData, date) => {
  const url = `${apiUrl}getAttendancesPerSubject`;
  try {
    const response = await axios.post(url, { date });
    if (response.data && response.data.success) {
      setData(response.data.data || []);
    } else {
      setData([]);
    }
  } catch (err) {
    console.error('Error fetching attendances per subject:', err);
    setData([]);
  }
};

// add attendance record for a subject (per-student)
export const addAttendancePerSubject = async (apiUrl, payload) => {
  const url = `${apiUrl}attendancePerSubject`;
  try {
    const response = await axios.post(url, payload);
    return response.data;
  } catch (err) {
    console.error('Error adding attendance per subject:', err);
    return { success: false, message: 'Network error' };
  }
};

// get all attendance per subject records of a teacher
export const fetchAllAttendancePerSubjectByTeacher = async (apiUrl, setData, teacherId) => {
  const url = `${apiUrl}getAllAttendancePerSubjectByTeacher`;

  try {
    const response = await axios.post(url, {
      teacherId,
    })

    if (response.data.success) {
      setData(response.data.attendancesByTeacher);
    } else {
      setData([]);
      console.log(response.data.message);
    }
  } catch (err) {
    console.error("Error fetching attendance records:", err);
    setData([]);
  }
}

