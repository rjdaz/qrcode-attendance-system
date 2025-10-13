import axios from "axios";

// fetch all classes today
export const fetchClasses = async (apiUrl, teacherId, setClasses) => {
  const url = `${apiUrl}getClassesToday`;
  try {
    const response = await axios.post(url, {
      teacherId,
    });

    //console.log(response.data.empNoResult);
    if (response.data.success) {
      setClasses(response.data.classes);
    }
  } catch (err) {
    console.error("Error fetching classes:", err);
  }
};

// fetch class adviser details
export const getClassAdviserDetails = async (apiUrl, userId, SetClassAdviser) => {
  const url = `${apiUrl}getClassAdvisorData`;

  try {
    const response = await axios.post(url, {
      userId,
    });

    if (response.data.success) {
      SetClassAdviser(response.data.sectionData);
    }
  } catch (err) {
    console.error(err);
  }
};

// fetch all students in a section
export const fetchStudentsInSection = async (apiUrl, sectionId, setStudents) => {
  const url = `${apiUrl}getStudentsInSection`;
  try {
    const response = await axios.post(url, {
      sectionId,
    });

    if (response.data.success) {
      setStudents(response.data.studentsdata);
    } else {
      console.log(response.data);
    }
  } catch (err) {
    console.error(err);
  }
};

