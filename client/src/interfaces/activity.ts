import { HistoryType } from "../enums/historyType";

export interface NewActivity {
  name: string;
  description?: string;
}
export interface Activity {
  name: string;
  description?: string;
  percent?: string;
  id: string;
  history: History[];
  date: string;
  [key: string]: any;
}

export interface History {
  description: string;
  type: HistoryType;
  id?: string;
  date?: string;
}

export interface NewHistory {
  activityId: string;
  history: History;
}
