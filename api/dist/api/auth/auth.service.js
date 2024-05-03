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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const argon = require("argon2");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const user_schema_1 = require("../../schemas/user.schema");
const jwt_service_1 = require("./jwt/jwt.service");
let AuthService = class AuthService {
    constructor(userModel, jwt) {
        this.userModel = userModel;
        this.jwt = jwt;
    }
    async signup(signupDto) {
        const existingUser = await this.userModel.findOne({
            username: signupDto.username,
        });
        if (existingUser) {
            throw new common_1.ConflictException("Username is already exist");
        }
        const hash = await argon.hash(signupDto.password);
        try {
            const user = new this.userModel({
                ...signupDto,
                password: hash,
            });
            await user.save();
            const { password, ...rest } = user.toJSON();
            const token = await this.jwt.signToken({
                userId: user._id,
            });
            return {
                token,
                user: rest,
            };
        }
        catch (error) {
            if (error instanceof mongoose_1.Error.ValidationError) {
                throw new common_1.ForbiddenException(error.message);
            }
            throw error;
        }
    }
    async signin(signinDto) {
        const user = await this.userModel.findOne({
            username: signinDto.username,
        });
        if (!user) {
            throw new common_1.ForbiddenException("Credentials Incorrect");
        }
        const passwordMatch = await argon.verify(user.password, signinDto.password);
        if (!passwordMatch) {
            throw new common_1.ForbiddenException("Credentials incorrect");
        }
        const token = await this.jwt.signToken({
            userId: user.id,
        });
        const { password, ...rest } = user.toJSON();
        return {
            token: token,
            user: rest,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        jwt_service_1.CreateJwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map