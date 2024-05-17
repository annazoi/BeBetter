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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { FeatureService } from "./features.service";
import { CreateFeatureDto } from "./dto/create-feature.dto";
import { Feature } from "src/schemas/feature.schema";
export declare class FeatureController {
    private featureService;
    constructor(featureService: FeatureService);
    create(createFeatureDto: CreateFeatureDto, req: Express.Request): Promise<import("mongoose").Document<unknown, {}, Feature> & Feature & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(query: any): Promise<Omit<import("mongoose").Document<unknown, {}, Feature> & Feature & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    findOne(id: string): Promise<Omit<import("mongoose").Document<unknown, {}, Feature> & Feature & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    createHistory(id: string, history: any): Promise<import("mongoose").Document<unknown, {}, Feature> & Feature & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: string): string;
}
