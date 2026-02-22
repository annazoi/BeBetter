import { HistoryTypeEnums } from "src/enums/historyType";
export declare class CreateActivityDto {
    name: string;
    description: string;
    type: string;
    goalValue?: number;
    unit?: string;
    history: string[];
}
export declare class CreateHistoryDto {
    description: string;
    type: HistoryTypeEnums;
    value?: number;
}
