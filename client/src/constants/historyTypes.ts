import { OptionItem } from "../interfaces/components";
import { HistoryType } from "./../enums/historyType";

export const HISTORY_TYPES: OptionItem[] = [
  {
    value: HistoryType.POSITIVE,
    label: "Positive",
  },
  {
    value: HistoryType.NEGATIVE,
    label: "Negative",
  },
];
