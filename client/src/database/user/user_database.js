import axios from 'axios';

export const getUserData = async (apiUrl, setUsersData) => {
  const url = `${apiUrl}getUserData`;

  try {
    const response = await axios.get(url);

    if (response.data.success) {
      setUsersData(response.data.userData);
    } else {
      console.log(response.data.message);
      
    }
  } catch (err) {
    console.log('Error: ', err);
  }
};