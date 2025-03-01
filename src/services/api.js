import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000/api';
const API_BASE_URL = 'https://globetrotter-backend-pnxh.onrender.com';


export const fetchQuestion = async () => {
    const { data } = await axios.get(`${API_BASE_URL}/api/destinations/random`);
    return data;
};

export const checkAnswer = async (destination, answer) => {
    if (!destination || !answer) {
        console.error("Error: Missing destination or answer in API call");
        return { error: "Invalid input data" };
    }

    try {
        const { data } = await axios.post(`${API_BASE_URL}/answer`, { destination, answer });
        return data;
    } catch (error) {
        console.error("Error in checkAnswer:", error.response?.data || error.message);
        throw error;
    }
};
