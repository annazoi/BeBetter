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
exports.FeatureController = void 0;
const common_1 = require("@nestjs/common");
const features_service_1 = require("./features.service");
const create_feature_dto_1 = require("./dto/create-feature.dto");
const update_feature_dto_1 = require("./dto/update-feature.dto");
const swagger_1 = require("@nestjs/swagger");
const feature_schema_1 = require("../../schemas/feature.schema");
const guard_1 = require("../auth/guard");
let FeatureController = class FeatureController {
    constructor(featureService) {
        this.featureService = featureService;
    }
    async create(createFeatureDto, req) {
        const { userId } = req.user;
        return this.featureService.create(createFeatureDto, userId);
    }
    async findAll(query, req) {
        return this.featureService.findAll(query);
    }
    findOne(id) {
        return this.featureService.findOne(+id);
    }
    update(id, updateFeatureDto) {
        return this.featureService.update(+id, updateFeatureDto);
    }
    remove(id) {
        return this.featureService.remove(+id);
    }
};
exports.FeatureController = FeatureController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOkResponse)({ type: feature_schema_1.Feature }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_feature_dto_1.CreateFeatureDto, Object]),
    __metadata("design:returntype", Promise)
], FeatureController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ type: feature_schema_1.Feature }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FeatureController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FeatureController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_feature_dto_1.UpdateFeatureDto]),
    __metadata("design:returntype", void 0)
], FeatureController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FeatureController.prototype, "remove", null);
exports.FeatureController = FeatureController = __decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Controller)("features"),
    (0, swagger_1.ApiTags)("Feautues"),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [features_service_1.FeatureService])
], FeatureController);
//# sourceMappingURL=features.controller.js.map