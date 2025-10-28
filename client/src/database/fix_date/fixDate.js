import axios from "axios";

export const getFixedDate = async (apiUrl, setFixDate, setFixTime, setFixDay) => {
  const url = `${apiUrl}getFixDateAndTime`;

  try {
    const response = await axios.get(url);
    setFixDate(response.data.date);
    setFixTime(response.data.time);
    setFixDay(response.data.day);
  } catch (err) {
    console.log(err);
  }
};
