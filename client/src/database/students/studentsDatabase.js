import axios from "axios";

// fetch all students
export const fetchStudents = async (apiUrl, setStudents) => {
  const url = `${apiUrl}getAllStudentsData`;

  try { 
    const response = await axios.get(url);

    if (response.data.success) {
      setStudents(response.data.studentsData);
    } else {

     }
  } catch (err) {
    console.error("Error fetching students:", err);
   }
};