import { ActivityService } from "./activities.service";
import { CreateActivityDto } from "./dto/create-activity.dto";
import { Activity } from "src/schemas/activities.schema";
export declare class ActivityController {
    private activityService;
    constructor(activityService: ActivityService);
    create(createActivityDto: CreateActivityDto, req: Express.Request): Promise<import("mongoose").Document<unknown, {}, Activity> & Activity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAll(query: any): Promise<(import("mongoose").Document<unknown, {}, Activity> & Activity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<Omit<import("mongoose").Document<unknown, {}, Activity> & Activity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, never>>;
    createHistory(id: string, history: any): Promise<import("mongoose").Document<unknown, {}, Activity> & Activity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    remove(id: string): string;
}
