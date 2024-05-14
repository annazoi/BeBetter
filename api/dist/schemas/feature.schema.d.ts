/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Types } from "mongoose";
import { HistoryTypeEnums } from "src/enums/historyType";
export declare class History {
    description?: string;
    type: HistoryTypeEnums;
}
export declare const HistorySchema: import("mongoose").Schema<History, import("mongoose").Model<History, any, any, any, import("mongoose").Document<unknown, any, History> & History & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, History, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<History>> & import("mongoose").FlatRecord<History> & {
    _id: Types.ObjectId;
}>;
export declare class Feature {
    name: string;
    description: string;
    userId: Types.ObjectId;
    history: History[];
}
export declare const FeatureSchema: import("mongoose").Schema<Feature, import("mongoose").Model<Feature, any, any, any, import("mongoose").Document<unknown, any, Feature> & Feature & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Feature, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Feature>> & import("mongoose").FlatRecord<Feature> & {
    _id: Types.ObjectId;
}>;
