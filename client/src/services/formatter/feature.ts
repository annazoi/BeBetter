import { HistoryType } from "../../enums/historyType";
import { Feature, History } from "../../interfaces/feature";
import { formatUser } from "./user";
// import { formatDate } from "./date";

export const formatFeature = (data: any): Feature => {
  handlePercent(data);
  return {
    name: data.name,
    description: data.description,
    percent: data.percent,
    id: data._id,
    userId: formatUser(data.userId),
    history: data.history.map((history: any) => formatHistory(history)),
    date: data.createdAt,
  };
};

export const formatHistory = (data: any): History => {
  return {
    description: data.description,
    type: data.type,
    id: data._id,
    date: data.createdAt,
  };
};

const handlePercent = (data: any) => {
  if (data.history.length === 0) {
    data.percent = "0.00";
    return data;
  }
  const positiveLength = data?.history.filter(
    (history: History) => history.type === HistoryType.POSITIVE
  ).length;

  const result = (positiveLength / data.history.length) * 100;
  data.percent = result.toFixed(2);
  return data;
};
