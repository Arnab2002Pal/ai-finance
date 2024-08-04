import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api/v1/"
})

export const googleAuthentication = async (url: string, option: any) => {
    try {
        const response = await axiosInstance.post(url, option);
        if (response.status === 200) return response.data;

    } catch (error) {
        console.error('Error retrieving data:', error);
        throw new Error('Could not get data');
    }
}

export const checkUserOrCreate = async (url: string, option: any) => {
    try {
        const response = await axiosInstance.post(url, option);
        return response.data;
    } catch (error) {
        console.error('Error retrieving data:', error);
        throw new Error('Could not get data');
    }
}