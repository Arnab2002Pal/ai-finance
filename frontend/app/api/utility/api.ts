import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
  // headers: {
  //     Authorization:
  // }
});

export const googleAuthentication = async (url: string, option: any) => {
  try {
    const response = await axiosInstance.post(url, option);
    if (response.status === 200) return response.data;
  } catch (error) {
    console.error("Error retrieving data:", error);
    throw new Error("Could not get data");
  }
};

export const checkUserOrCreate = async (url: string, option: any) => {
  try {
    const response = await axiosInstance.post(url, option);
    return response.data;
  } catch (error) {
    console.error("Error retrieving data:", error);
    throw new Error("Could not get data");
  }
};

export const postUserInfo = async (url: string, option: any) => {
  try {
    const response = await axiosInstance.post(url, option);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getUserInfo = async (url: string) => {
  try {
    const response = await axiosInstance.get(url);
    console.log("Response:", response);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      console.error("No response received:", error.request);
      throw new Error("No response from server");
    } else {
      console.error("Error setting up request:", error.message);
      throw new Error("Request setup failed");
    }
  }
};
