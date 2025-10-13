import { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchStudents } from '../students/studentsDatabase';

export const qrcodeAttendance = async (decodedText, apiUrl) => {
  const url = `${apiUrl}qrcodeAttendance`;
  const [allStudents, setAllStudents] = useState([]);
  
  


  try { 
    const response = await axios.post(url, {
      decodedText
    });

    if (response.data.success) { 

    } else {

    }

  } catch (err) {

  }
   
};

