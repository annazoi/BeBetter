import { HistoryType } from "../../enums/historyType";
import { Feature, History } from "../../interfaces/feature";
import { formatUser } from "./user";

export const formatFeature = (data: any): Feature => {
  handlePercent(data);
  return {
    name: data.name,
    description: data.description,
    percent: data.percent,
    id: data._id,
    userId: formatUser(data.userId),
    history: data.history,
  };
};

const handlePercent = (data: any) => {
  const positiveLength = data?.history.filter(
    (history: History) => history.type === HistoryType.POSITIVE
  ).length;
  console.log("Positive Length", positiveLength);

  const result = (positiveLength / data.history.length) * 100;

  data.percent = result.toFixed(2);

  console.log("Data", data);
  return data;
};
