import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Req,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtGuard } from "../auth/guard";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { User } from "src/schemas/user.schema";

@UseGuards(JwtGuard)
@Controller("users")
@ApiTags("User")
@ApiBearerAuth()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get("")
  @ApiOkResponse({ type: [User] })
  @ApiBearerAuth()
  findAll(@Query() query: any) {
    return this.usersService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
