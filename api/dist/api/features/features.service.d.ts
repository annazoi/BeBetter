import { CreateFeatureDto } from "./dto/create-feature.dto";
import { Feature } from "src/schemas/feature.schema";
import { Model } from "mongoose";
export declare class FeatureService {
    private featureModel;
    constructor(featureModel: Model<Feature>);
    create(createFeatureDto: CreateFeatureDto, userId: string): Promise<import("mongoose").Document<unknown, {}, Feature> & Feature & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAll(query: any): Promise<(import("mongoose").Document<unknown, {}, Feature> & Feature & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findOne(featureId: string): Promise<Omit<import("mongoose").Document<unknown, {}, Feature> & Feature & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, never>>;
    createHistory(featureId: string, history: any): Promise<import("mongoose").Document<unknown, {}, Feature> & Feature & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    remove(id: number): string;
}
