import axios from "axios";
import { Activity, NewActivity, NewHistory } from "../interfaces/activity";
import { API_URL } from "../constants/api";
import { formatActivity } from "./formatter/activity";
import { getAuthHeaders } from "../utils/headers";

export const createActivity = async (payload: NewActivity) => {
  try {
    const response = await axios.post(
      `${API_URL}/activities`,
      payload,
      getAuthHeaders()
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getActivities = async (
  query: { [key: string]: string } = {}
): Promise<Activity[]> => {
  try {
    const response = await axios.get(
      `${API_URL}/activities?${new URLSearchParams(query).toString()}`,
      getAuthHeaders()
    );
    const formattedData = response.data.map((activity: any) => {
      return formatActivity(activity);
    });
    return formattedData;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getActivity = async (activityId: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/activities/${activityId}`,
      getAuthHeaders()
    );
    const formattedData = formatActivity(response.data);
    return formattedData;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const createHistory = async ({ activityId, history }: NewHistory) => {
  try {
    const response = await axios.post(
      `${API_URL}/activities/${activityId}/history`,
      history,
      getAuthHeaders()
    );
    console.log("Response", response.data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
