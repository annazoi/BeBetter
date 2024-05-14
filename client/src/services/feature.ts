import axios from "axios";
import { Feature, NewFeature } from "../interfaces/feature";
import { API_URL } from "../constants/api";
import { formatFeature } from "./formatter/feature";
import { getAuthHeaders } from "../utils/headers";
import { get } from "react-hook-form";

export const createFeature = async (payload: NewFeature) => {
  try {
    const response = await axios.post(
      `${API_URL}/features`,
      payload,
      getAuthHeaders()
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getFeatures = async (
  query: { [key: string]: string } = {}
): Promise<Feature[]> => {
  try {
    const response = await axios.get(
      `${API_URL}/features?${new URLSearchParams(query).toString()}`,
      getAuthHeaders()
    );
    const formattedData = response.data.map((feature: Feature) => {
      formatFeature(feature);
    });
    return formattedData;
  } catch (error: any) {
    throw error.response.data;
  }
};
