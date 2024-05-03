/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { SignupDto } from "./dto/signup.dto";
import { SigninDto } from "./dto/signin.dto";
import { Model } from "mongoose";
import { User } from "src/schemas/user.schema";
import { CreateJwtService } from "./jwt/jwt.service";
export declare class AuthService {
    private userModel;
    private jwt;
    constructor(userModel: Model<User>, jwt: CreateJwtService);
    signup(signupDto: SignupDto): Promise<{
        token: string;
        user: {
            username: string;
            fullName: string;
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    signin(signinDto: SigninDto): Promise<{
        token: string;
        user: {
            username: string;
            fullName: string;
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
}
