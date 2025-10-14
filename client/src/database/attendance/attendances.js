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