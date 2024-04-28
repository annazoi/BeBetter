import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupDto } from "./dto/signup.dto";
import { SigninDto } from "./dto/signin.dto";
import { ApiTags, ApiOkResponse } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { User } from "src/schemas/user.schema";

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  @ApiOkResponse({ type: User })
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }
  @HttpCode(HttpStatus.OK)
  @Post("signin")
  signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }
}
