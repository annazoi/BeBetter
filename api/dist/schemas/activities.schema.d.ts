import { Types } from "mongoose";
import { HistoryTypeEnums } from "src/enums/historyType";
export declare class History {
    description?: string;
    type: HistoryTypeEnums;
    value?: number;
}
export declare const HistorySchema: import("mongoose").Schema<History, import("mongoose").Model<History, any, any, any, import("mongoose").Document<unknown, any, History> & History & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, History, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<History>> & import("mongoose").FlatRecord<History> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare class Activity {
    name: string;
    description: string;
    type: string;
    goalValue?: number;
    unit?: string;
    userId: Types.ObjectId;
    history: History[];
}
export declare const ActivitySchema: import("mongoose").Schema<Activity, import("mongoose").Model<Activity, any, any, any, import("mongoose").Document<unknown, any, Activity> & Activity & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Activity, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Activity>> & import("mongoose").FlatRecord<Activity> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
