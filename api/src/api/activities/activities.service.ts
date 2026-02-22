import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { CreateActivityDto } from "./dto/create-activity.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Activity } from "src/schemas/activities.schema";
import { Model, Error } from "mongoose";

@Injectable()
export class ActivityService {
  constructor(
    @InjectModel(Activity.name)
    private activityModel: Model<Activity>
  ) { }
  async create(createActivityDto: CreateActivityDto, userId: string) {
    try {
      const existingActivity = await this.activityModel.findOne({
        name: createActivityDto.name,
      });
      if (existingActivity) {
        throw new ConflictException("Activity is already exist");
      }
      const activity = new this.activityModel({
        ...createActivityDto,
        userId,
      });
      await activity.save();
      return activity;
    } catch (error: any) {
      if (error instanceof Error.ValidationError) {
        throw new ForbiddenException(error.message);
      }
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new ForbiddenException(error.message || "An unexpected error occurred");
    }
  }

  async findAll(query: any) {
    try {
      const activities = await this.activityModel
        .find({ ...query })
        .populate("userId", "-password");
      if (!activities) {
        throw new Error("No activities found");
      }
      return activities;
    } catch (error: any) {
      throw new ForbiddenException(error.message);
    }
  }

  async findOne(activityId: string) {
    try {
      const activity = (await this.activityModel.findById(activityId)).populate(
        "userId",
        "-password"
      );
      if (!activity) {
        throw new Error("Activity not found");
      }
      return activity;
    } catch (error: any) {
      throw new ForbiddenException(error.message);
    }
  }

  async createHistory(activityId: string, history: any) {
    try {
      const activity = await this.activityModel.findById(activityId);
      if (!activity) {
        throw new Error("Activity not found");
      }
      activity.history.push(history);
      await activity.save();
      return activity;
    } catch (error: any) {
      throw new ForbiddenException(error.message);
    }
  }

  async remove(activityId: string) {
    try {
      const result = await this.activityModel.findByIdAndDelete(activityId);
      if (!result) {
        throw new Error("Activity not found");
      }
      return result;
    } catch (error: any) {
      throw new ForbiddenException(error.message);
    }
  }
}
