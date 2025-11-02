import axios from "axios";

export const getAllsubjAttendanceByday = async (
  apiUrl,
  setSubjAttendance,
  date
) => {
  const url = `${apiUrl}getAllsubjAttendanceByday`;

  try {
    const response = await axios.post(url, {
      date: date,
    });

    if (response.data.success) {
      setSubjAttendance(response.data.subjAttendance);
    } else {
      console.log(response.data.message);
    }
  } catch (err) {
    console.log("Error fetching attendance per subject data:", err);
  }
};

