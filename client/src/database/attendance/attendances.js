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
    const responce = await axios.post(url, {
      sectionId,
      date,
    });

    console.log(responce.data)

    if (responce.data.success) {
      setAllAttendances(responce.data.currentAttendances);
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

