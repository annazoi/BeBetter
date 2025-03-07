import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { CreateFeatureDto } from "./dto/create-feature.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Feature } from "src/schemas/feature.schema";
import { Model, Error } from "mongoose";

@Injectable()
export class FeatureService {
  constructor(
    @InjectModel(Feature.name)
    private featureModel: Model<Feature>
  ) {}
  async create(createFeatureDto: CreateFeatureDto, userId: string) {
    try {
      const existingFeature = await this.featureModel.findOne({
        name: createFeatureDto.name,
      });
      if (existingFeature) {
        throw new ConflictException("Feature is already exist");
      }
      const feature = new this.featureModel({
        ...createFeatureDto,
        userId,
      });
      await feature.save();
      return feature;
    } catch (error: any) {
      if (error instanceof Error.ValidationError) {
        throw new ForbiddenException(error.message);
      }
      throw error.response.data;
    }
  }

  async findAll(query: any) {
    try {
      const features = await this.featureModel
        .find({ ...query })
        .populate("userId", "-password");
      if (!features) {
        throw new Error("No features found");
      }
      return features;
    } catch (error: any) {
      throw new ForbiddenException(error.message);
    }
  }

  async findOne(featureId: string) {
    try {
      const feature = (await this.featureModel.findById(featureId)).populate(
        "userId",
        "-password"
      );
      if (!feature) {
        throw new Error("Feature not found");
      }
      return feature;
    } catch (error: any) {
      throw new ForbiddenException(error.message);
    }
  }

  async createHistory(featureId: string, history: any) {
    try {
      const feature = await this.featureModel.findById(featureId);
      if (!feature) {
        throw new Error("Feature not found");
      }
      feature.history.push(history);
      await feature.save();
      return feature;
    } catch (error: any) {
      throw new ForbiddenException(error.message);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} feature`;
  }
}
