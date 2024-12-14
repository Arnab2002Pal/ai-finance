import { UserInput } from "@/app/interface/userInterface";
import { redirect } from 'next/navigation'
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
    if (response.status === 404) return response.data;
  } catch (error: any) {
    console.error("Error retrieving data for Google Login:", error);
    return error.response.data
  }
};

export const credentialAuthentication = async (url: string, option: any) => {
  try {
    const response = await axiosInstance.post(url, option);
    return response.data;
  } catch (error: any) {
    console.error("Error retrieving data for Credential Login:", error);
    return error.response.data
  }
};

export const generateFinancialAdvice = async (url: string, option: any) => {
  try {
    const response = await axiosInstance.post(url, option);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const credentialUserRegistration = async (url: string, option: UserInput) => {
  try {
    const response = await axiosInstance.post(url, option);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

/**
 * Fetches user information from the specified URL using the axiosInstance.
 *
 * @param url - The URL to fetch user information from.
 * @returns - The user information if the request is successful.
 * @throws - Throws an error if the request fails or if no response is received.
 *
 * @remarks
 * This function uses the axiosInstance to make a GET request to the specified URL.
 * If the request is successful, it returns the user information.
 * If the request fails, it throws an error with a descriptive message.
 * If no response is received, it throws an error with a descriptive message.
 */
export const getUserInfo = async (url: string) => {
  try {
    const response = await axiosInstance.get(url);
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

/**
 * Fetches data from the specified URL using the axiosInstance.
 *
 * @param url - The URL to fetch data.
 * @returns - The fetched data if the request is successful and the status code is 200.
 * @throws - Throws an error if the request fails or if no response is received.
 * Throws an error with a descriptive message if the status code is 400 or 404.
 *
 * @remarks
 * This function uses the axiosInstance to make a GET request to the specified URL.
 * If the request is successful and the status code is 200, it returns the fetched data.
 * If the request fails, it throws an error with a descriptive message.
 * If no response is received, it throws an error with a descriptive message.
 * If the status code is 400 or 404, it returns the error response data.
 */
export const fetchData = async (url: string) => {
  try {
    const response = await axiosInstance.get(url);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    const status = error?.response?.status;
    if (status === 400 || status === 404) {
      return error.response.data;  // Handle 400 and 404 gracefully
    }
    throw new Error(`Server Error: ${error.response?.data?.message || "Unknown Error"}`);
  }
};

export const checkFinancialReport = async (url: string) => {
  try {
    const response = await axiosInstance.get(url);    
    return response.data;
  } catch (error: any) {
    const status = error?.response?.status;
    if (status === 400 || status === 404) {
      return error.response.data; 
    }  }
}

