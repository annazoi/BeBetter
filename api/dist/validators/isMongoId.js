"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsMongoId = void 0;
const mongoose_1 = require("mongoose");
const class_validator_1 = require("class-validator");
let IsMongoId = class IsMongoId {
    validate(text, args) {
        const validObjectId = mongoose_1.Types.ObjectId.isValid(text);
        return validObjectId;
    }
    defaultMessage(args) {
        return `${args.value} must be a valid ObjectId`;
    }
};
exports.IsMongoId = IsMongoId;
exports.IsMongoId = IsMongoId = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: "mongo-id", async: false })
], IsMongoId);
//# sourceMappingURL=isMongoId.js.map