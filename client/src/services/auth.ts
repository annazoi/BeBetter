import axios from "axios";
import { API_URL } from "../constants/api";

export const signup = async () => {
  const response = await axios.post(`${API_URL}/auth/signup`);
};
