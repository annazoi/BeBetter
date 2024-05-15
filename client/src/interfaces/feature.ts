import { HistoryType } from "../enums/historyType";

export interface NewFeature {
  name: string;
  description?: string;
}
export interface Feature {
  name: string;
  description?: string;
  percent?: string;
  id: string;
  history: string[];
  [key: string]: any;
}

export interface History {
  description: string;
  type: HistoryType;
}
