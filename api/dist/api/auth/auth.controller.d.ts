import { AuthService } from "./auth.service";
import { SignupDto } from "./dto/signup.dto";
import { SigninDto } from "./dto/signin.dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
