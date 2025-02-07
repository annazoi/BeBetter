"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const feature_schema_1 = require("../../schemas/feature.schema");
const mongoose_2 = require("mongoose");
let FeatureService = class FeatureService {
    constructor(featureModel) {
        this.featureModel = featureModel;
    }
    async create(createFeatureDto, userId) {
        try {
            const existingFeature = await this.featureModel.findOne({
                name: createFeatureDto.name,
            });
            if (existingFeature) {
                throw new common_1.ConflictException("Feature is already exist");
            }
            const feature = new this.featureModel({
                ...createFeatureDto,
                userId,
            });
            await feature.save();
            return feature;
        }
        catch (error) {
            if (error instanceof mongoose_2.Error.ValidationError) {
                throw new common_1.ForbiddenException(error.message);
            }
            throw error.response.data;
        }
    }
    async findAll(query) {
        try {
            const features = await this.featureModel
                .find({ ...query })
                .populate("userId", "-password");
            if (!features) {
                throw new mongoose_2.Error("No features found");
            }
            return features;
        }
        catch (error) {
            throw new common_1.ForbiddenException(error.message);
        }
    }
    async findOne(featureId) {
        try {
            const feature = (await this.featureModel.findById(featureId)).populate("userId", "-password");
            if (!feature) {
                throw new mongoose_2.Error("Feature not found");
            }
            return feature;
        }
        catch (error) {
            throw new common_1.ForbiddenException(error.message);
        }
    }
    async createHistory(featureId, history) {
        try {
            const feature = await this.featureModel.findById(featureId);
            if (!feature) {
                throw new mongoose_2.Error("Feature not found");
            }
            feature.history.push(history);
            await feature.save();
            return feature;
        }
        catch (error) {
            throw new common_1.ForbiddenException(error.message);
        }
    }
    remove(id) {
        return `This action removes a #${id} feature`;
    }
};
exports.FeatureService = FeatureService;
exports.FeatureService = FeatureService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(feature_schema_1.Feature.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FeatureService);
//# sourceMappingURL=features.service.js.map