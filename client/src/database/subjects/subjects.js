import axios from "axios";

// sorting Subject by Section
export const sortingSubjectsBySection = async (
  apiUrl,
  sectionId,
  setAllSubjBySect
) => {
  const url = `${apiUrl}sortingSubjectsBySection`;
  console.log(sectionId)
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
export const getAllStudentsBySubjects = async (
  apiUrl,
  getSubjectId,
  setAllStudentsBySubjects
) => {
  const url = `${apiUrl}getAllStudentsBySubjects`;

  console.log(getSubjectId);
  try {
    const response = await axios.post(url, {
      getSubjectId,
    });

    if (response.data.success) {
      setAllStudentsBySubjects(response.data.studentSubject);
    } else {
      console.log(response.data.message);
      setAllStudentsBySubjects([]);
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};
