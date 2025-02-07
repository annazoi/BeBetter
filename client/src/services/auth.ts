import axios from "axios";
import { API_URL } from "../constants/api";
import { Signin, Signup } from "../interfaces/user";
import { decodeToken } from "../utils/token";

export const signup = async (payload: Signup) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, payload);
    const { exp } = decodeToken(response.data.token);

    const data = {
      exp,
      ...response.data,
    };
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const signin = async (payload: Signin) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signin`, payload);
    const { exp } = decodeToken(response.data.token);
    const data = {
      exp,
      ...response.data,
    };
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};
