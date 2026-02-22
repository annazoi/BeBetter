import { CreateActivityDto } from "./dto/create-activity.dto";
import { Activity } from "src/schemas/activities.schema";
import { Model } from "mongoose";
export declare class ActivityService {
    private activityModel;
    constructor(activityModel: Model<Activity>);
    create(createActivityDto: CreateActivityDto, userId: string): Promise<import("mongoose").Document<unknown, {}, Activity> & Activity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAll(query: any): Promise<(import("mongoose").Document<unknown, {}, Activity> & Activity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findOne(activityId: string): Promise<Omit<import("mongoose").Document<unknown, {}, Activity> & Activity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, never>>;
    createHistory(activityId: string, history: any): Promise<import("mongoose").Document<unknown, {}, Activity> & Activity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    remove(activityId: string): Promise<import("mongoose").Document<unknown, {}, Activity> & Activity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
