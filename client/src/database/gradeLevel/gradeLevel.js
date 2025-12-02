import axios from "axios";

export const AllgradeLevel = async (apiUrl, setGetAllgradeLevel) => {
    const url = `${apiUrl}getAllGradeLevel`;

    try {
        const response = await axios.get(url);

        if(response.data.success){
            setGetAllgradeLevel(response.data.gradelevels);
        } else {
            console.log(response.data.message);
        }
    } catch (err) {
       console.log(err); 
    }
};
