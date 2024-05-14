import { HistoryTypeEnums } from "src/enums/historyType";
export declare class CreateFeatureDto {
    name: string;
    description: string;
    history: string[];
}
export declare class CreateHistoryDto {
    description: string;
    type: HistoryTypeEnums;
}
