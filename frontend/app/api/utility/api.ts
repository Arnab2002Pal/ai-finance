import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
    // headers: {
    //     Authorization: 
    // }
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

export const postUserInfo = async (url: string, option: any) => {
    try {
        const response = await axiosInstance.post(url, option);
        return response.data;
    } catch (error) {
        console.error('Error retrieving data:', error);
        throw new Error('Could not get data');
    }
}

export const getUserInfo = async (url: string) => {    
    try {
        const response = await axiosInstance.get(url);
        return response.data;
    } catch (error) {
        console.error('Error retrieving data:', error);
        throw new Error('Could not get data');
    }
}