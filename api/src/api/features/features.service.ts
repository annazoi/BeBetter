import { ConflictException, Injectable } from "@nestjs/common";
import { CreateFeatureDto } from "./dto/create-feature.dto";
import { UpdateFeatureDto } from "./dto/update-feature.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Feature } from "src/schemas/feature.schema";
import { Model, Error } from "mongoose";

@Injectable()
export class FeatureService {
  constructor(
    @InjectModel(Feature.name)
    private featureModel: Model<Feature>
  ) {}
  async create(createFeatureDto: CreateFeatureDto) {
    const existingFeature = await this.featureModel.findOne({
      name: createFeatureDto.name,
    });
    if (existingFeature) {
      throw new ConflictException("Feature is already exist");
    }
    const feature = new this.featureModel({
      ...createFeatureDto,
    });
    await feature.save();
    return feature;
  }

  findAll() {
    return `This action returns all features`;
  }

  findOne(id: number) {
    return `This action returns a #${id} feature`;
  }

  update(id: number, updateFeatureDto: UpdateFeatureDto) {
    return `This action updates a #${id} feature`;
  }

  remove(id: number) {
    return `This action removes a #${id} feature`;
  }
}
