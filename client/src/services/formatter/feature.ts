import { Feature } from "../../interfaces/feature";
import { formatUser } from "./user";

export const formatFeature = (data: any): Feature => {
  // console.log("data", data);
  return {
    name: data.name,
    description: data.description,
    // percent: data.percent,
    id: data._id,
    userId: formatUser(data.userId),
  };
};
