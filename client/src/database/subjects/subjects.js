import axios from "axios";

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
      console.log('No data Fetching!');
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};