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
            __v: number;
        };
    }>;
    signin(signinDto: SigninDto): Promise<{
        token: string;
        user: {
            username: string;
            fullName: string;
            _id: import("mongoose").Types.ObjectId;
            __v: number;
        };
    }>;
}
