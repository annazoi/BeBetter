import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
export declare class CreateJwtService {
    private jwt;
    private config;
    constructor(jwt: JwtService, config: ConfigService);
    signToken(payload: any): Promise<string>;
}
