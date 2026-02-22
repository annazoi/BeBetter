import { HistoryType } from "../enums/historyType";

export interface NewActivity {
  name: string;
  description?: string;
  type: "percentage" | "numeric" | "boolean";
  goalValue?: number;
  unit?: string;
}

export interface Activity {
  name: string;
  description?: string;
  type: "percentage" | "numeric" | "boolean";
  goalValue?: number;
  unit?: string;
  percent?: string;
  id: string;
  history: History[];
  date: string;
  [key: string]: any;
}

export interface History {
  description: string;
  type: HistoryType;
  value?: number;
  id?: string;
  date?: string;
}

export interface NewHistory {
  activityId: string;
  history: History;
}
