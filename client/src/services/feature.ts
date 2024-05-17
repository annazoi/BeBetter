import axios from "axios";
import { Feature, NewFeature, NewHistory } from "../interfaces/feature";
import { API_URL } from "../constants/api";
import { formatFeature } from "./formatter/feature";
import { getAuthHeaders } from "../utils/headers";

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
    const formattedData = response.data.map((feature: any) => {
      return formatFeature(feature);
    });
    return formattedData;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getFeature = async (featureId: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/features/${featureId}`,
      getAuthHeaders()
    );
    const formattedData = formatFeature(response.data);
    return formattedData;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const createHistory = async ({ featureId, history }: NewHistory) => {
  try {
    const response = await axios.post(
      `${API_URL}/features/${featureId}/history`,
      history,
      getAuthHeaders()
    );
    console.log("Response", response.data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
