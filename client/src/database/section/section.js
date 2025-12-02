import axios from "axios";

export const AllSection = async (apiUrl, setGetAllSection) => {
    const url = `${apiUrl}getAllSection`;

    try {
        const response = await axios.get(url);

        if (response.data.success) {
            setGetAllSection(response.data.allSection);
        } else {
            console.log(response.data.message);
            setGetAllSection(response.data.allSection);
        }
    } catch (err) {
        console.log(err);
    }

}