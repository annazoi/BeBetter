import { HistoryType } from "../../enums/historyType";
import { Activity, History } from "../../interfaces/activity";
import { formatUser } from "./user";

export const formatActivity = (data: any): Activity => {
  handlePercent(data);
  return {
    name: data.name,
    description: data.description,
    type: data.type,
    goalValue: data.goalValue,
    unit: data.unit,
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
    value: data.value,
    id: data._id,
    date: data.createdAt,
  };
};

const handlePercent = (data: any) => {
  if (data.type !== "percentage") {
    data.percent = "0.00";
    return data;
  }

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyHistory = data.history.filter((history: any) => {
    const d = new Date(history.createdAt);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  if (monthlyHistory.length === 0) {
    data.percent = "0.00";
    return data;
  }
  const positiveLength = monthlyHistory.filter(
    (history: any) => history.type === HistoryType.POSITIVE
  ).length;

  const result = (positiveLength / monthlyHistory.length) * 100;
  data.percent = result.toFixed(2);
  return data;
};
