import { FeatureService } from "./features.service";
import { CreateFeatureDto } from "./dto/create-feature.dto";
import { Feature } from "src/schemas/feature.schema";
export declare class FeatureController {
    private featureService;
    constructor(featureService: FeatureService);
    create(createFeatureDto: CreateFeatureDto, req: Express.Request): Promise<import("mongoose").Document<unknown, {}, Feature> & Feature & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAll(query: any): Promise<(import("mongoose").Document<unknown, {}, Feature> & Feature & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<Omit<import("mongoose").Document<unknown, {}, Feature> & Feature & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, never>>;
    createHistory(id: string, history: any): Promise<import("mongoose").Document<unknown, {}, Feature> & Feature & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    remove(id: string): string;
}
