import { Feature } from "../../interfaces/feature";

export const formatFeature = (data: any): Feature => {
  return {
    name: data.name,
    description: data.description,
    // percent: data.percent,
    id: data.id,
  };
};
