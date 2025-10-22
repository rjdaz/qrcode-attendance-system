import axios from "axios";

// sorting Subject by Section
export const sortingSubjectsBySection = async (
  apiUrl,
  sectionId,
  setAllSubjBySect
) => {
  const url = `${apiUrl}sortingSubjectsBySection`;

  try {
    const response = await axios.post(url, {
      sectionId,
    });

    if (response.data.success) {
      setAllSubjBySect(response.data.subjectsData);
    } else {
      console.log("No data Fetching!");
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

// get all subject data
export const getAllSubjectData = async (apiUrl, setAllSubjectData) => {
  const url = `${apiUrl}getAllSubjectData`;

  try {
    const response = await axios.get(url);

    if (response.data.success) {
      setAllSubjectData(response.data.subjectsData);
    } else {
      console.log(response.data.message);
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

// get all students by subjects
export const getAllStudentsBySubjects = async (apiUrl, setAllStudentsBySubjects) => {
  const url = `${apiUrl}getAllStudentsBySubjects`;

  try {
    const response = await axios.get(url);

      if (response.data.success) {
        setAllStudentsBySubjects(reponse.data.studentsSubjectsData);
      } else {
        console.log(reponse.data.message);
      }
  } catch (err) {
    console.log("Error: ", err);
  }
}
