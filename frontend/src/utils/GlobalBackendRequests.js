import axios from "axios";

const handleRunRequest = async (id) => {
    try {
        const response = await axios.post("http://127.0.0.1:5000/process/edit" + "?id=" + id, {
            data: "Your request data here",
        });
    } catch (error) {
        console.error("Error making POST request", error);
    }
};

export {handleRunRequest};