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
import { UserService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtGuard } from "../auth/guard";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { User } from "src/schemas/user.schema";

@UseGuards(JwtGuard)
@Controller("users")
@ApiTags("User")
@ApiBearerAuth()
export class UserController {
  constructor(private userService: UserService) {}

  @Get("")
  @ApiOkResponse({ type: [User] })
  @ApiBearerAuth()
  findAll(@Query() query: any) {
    return this.userService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }
}
