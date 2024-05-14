import { Feature } from "../../interfaces/feature";
import { formatUser } from "./user";

export const formatFeature = (data: any): Feature => {
  return {
    name: data.name,
    description: data.description,
    // percent: data.percent,
    id: data.id,
    userId: formatUser(data.userId),
  };
};
