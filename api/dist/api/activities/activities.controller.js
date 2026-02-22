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
exports.ActivityController = void 0;
const common_1 = require("@nestjs/common");
const activities_service_1 = require("./activities.service");
const create_activity_dto_1 = require("./dto/create-activity.dto");
const swagger_1 = require("@nestjs/swagger");
const activities_schema_1 = require("../../schemas/activities.schema");
const guard_1 = require("../auth/guard");
let ActivityController = class ActivityController {
    constructor(activityService) {
        this.activityService = activityService;
    }
    async create(createActivityDto, req) {
        const { userId } = req.user;
        return this.activityService.create(createActivityDto, userId);
    }
    async findAll(query) {
        return this.activityService.findAll(query);
    }
    findOne(id) {
        return this.activityService.findOne(id);
    }
    async createHistory(id, history) {
        return this.activityService.createHistory(id, history);
    }
    remove(id) {
        return this.activityService.remove(id);
    }
};
exports.ActivityController = ActivityController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOkResponse)({ type: activities_schema_1.Activity }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_activity_dto_1.CreateActivityDto, Object]),
    __metadata("design:returntype", Promise)
], ActivityController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ type: activities_schema_1.Activity }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ActivityController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOkResponse)({ type: activities_schema_1.Activity }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ActivityController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(":id/history"),
    (0, swagger_1.ApiOkResponse)({ type: activities_schema_1.Activity }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ActivityController.prototype, "createHistory", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ActivityController.prototype, "remove", null);
exports.ActivityController = ActivityController = __decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Controller)("activities"),
    (0, swagger_1.ApiTags)("Activities"),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [activities_service_1.ActivityService])
], ActivityController);
//# sourceMappingURL=activities.controller.js.map