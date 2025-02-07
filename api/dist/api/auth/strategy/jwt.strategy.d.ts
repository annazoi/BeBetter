import { ConfigService } from "@nestjs/config";
import { Model } from "mongoose";
import { User } from "src/schemas/user.schema";
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private userModel;
    constructor(config: ConfigService, userModel: Model<User>);
    validate(payload: {
        userId: string;
    }): Promise<{
        userId: string;
    }>;
}
export {};
