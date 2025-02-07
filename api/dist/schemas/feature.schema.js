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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureSchema = exports.Feature = exports.HistorySchema = exports.History = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const historyType_1 = require("../enums/historyType");
let History = class History {
};
exports.History = History;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], History.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: historyType_1.HistoryTypeEnums }),
    __metadata("design:type", String)
], History.prototype, "type", void 0);
exports.History = History = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
    })
], History);
exports.HistorySchema = mongoose_1.SchemaFactory.createForClass(History);
let Feature = class Feature {
};
exports.Feature = Feature;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Feature.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Feature.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "User" }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Feature.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.HistorySchema] }),
    __metadata("design:type", Array)
], Feature.prototype, "history", void 0);
exports.Feature = Feature = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
    })
], Feature);
exports.FeatureSchema = mongoose_1.SchemaFactory.createForClass(Feature);
//# sourceMappingURL=feature.schema.js.map