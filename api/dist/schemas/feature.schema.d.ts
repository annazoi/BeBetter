import { Types } from "mongoose";
import { HistoryTypeEnums } from "src/enums/historyType";
export declare class History {
    description?: string;
    type: HistoryTypeEnums;
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
export declare class Feature {
    name: string;
    description: string;
    userId: Types.ObjectId;
    history: History[];
}
export declare const FeatureSchema: import("mongoose").Schema<Feature, import("mongoose").Model<Feature, any, any, any, import("mongoose").Document<unknown, any, Feature> & Feature & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Feature, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Feature>> & import("mongoose").FlatRecord<Feature> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
