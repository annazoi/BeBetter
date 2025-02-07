"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const jsonwebtoken_1 = require("jsonwebtoken");
class JwtGuard extends (0, passport_1.AuthGuard)("jwt") {
    handleRequest(err, user, info, context, status) {
        if (info instanceof jsonwebtoken_1.JsonWebTokenError) {
            throw new common_1.UnauthorizedException({
                message: "Invalid token",
                code: "invalid_token",
            });
        }
        return super.handleRequest(err, user, info, context, status);
    }
}
exports.JwtGuard = JwtGuard;
//# sourceMappingURL=jwt.guard.js.map