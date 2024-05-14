"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureModule = void 0;
const common_1 = require("@nestjs/common");
const features_service_1 = require("./features.service");
const features_controller_1 = require("./features.controller");
const mongoose_1 = require("@nestjs/mongoose");
const feature_schema_1 = require("../../schemas/feature.schema");
let FeatureModule = class FeatureModule {
};
exports.FeatureModule = FeatureModule;
exports.FeatureModule = FeatureModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: "Feature", schema: feature_schema_1.FeatureSchema }]),
        ],
        exports: [features_service_1.FeatureService],
        controllers: [features_controller_1.FeatureController],
        providers: [features_service_1.FeatureService],
    })
], FeatureModule);
//# sourceMappingURL=features.module.js.map