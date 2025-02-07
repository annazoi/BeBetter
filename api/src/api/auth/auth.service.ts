import {
  ForbiddenException,
  Injectable,
  ConflictException,
} from "@nestjs/common";
import { SignupDto } from "./dto/signup.dto";
import { SigninDto } from "./dto/signin.dto";
import * as argon from "argon2";
import { Model, Error } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "src/schemas/user.schema";
import { CreateJwtService } from "./jwt/jwt.service";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwt: CreateJwtService
  ) {}
  async signup(signupDto: SignupDto) {
    const existingUser = await this.userModel.findOne({
      username: signupDto.username,
    });
    if (existingUser) {
      throw new ConflictException("Username is already exist");
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
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        throw new ForbiddenException(error.message);
      }
      throw error;
    }
  }

  async signin(signinDto: SigninDto) {
    const user = await this.userModel.findOne({
      username: signinDto.username,
    });
    if (!user) {
      throw new ForbiddenException("Credentials Incorrect");
    }
    const passwordMatch = await argon.verify(user.password, signinDto.password);

    if (!passwordMatch) {
      throw new ForbiddenException("Credentials incorrect");
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
}
