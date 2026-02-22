import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ActivityService } from "./activities.service";
import { CreateActivityDto } from "./dto/create-activity.dto";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Activity } from "src/schemas/activities.schema";
import { JwtGuard } from "../auth/guard";

@UseGuards(JwtGuard)
@Controller("activities")
@ApiTags("Activities")
@ApiBearerAuth()
export class ActivityController {
  constructor(private activityService: ActivityService) { }

  @Post()
  @ApiOkResponse({ type: Activity })
  async create(
    @Body() createActivityDto: CreateActivityDto,
    @Req() req: Express.Request
  ) {
    const { userId } = req.user;

    return this.activityService.create(createActivityDto, userId);
  }

  @Get()
  @ApiOkResponse({ type: Activity })
  async findAll(@Query() query: any) {
    return this.activityService.findAll(query);
  }

  @Get(":id")
  @ApiOkResponse({ type: Activity })
  findOne(@Param("id") id: string) {
    return this.activityService.findOne(id);
  }

  @Post(":id/history")
  @ApiOkResponse({ type: Activity })
  async createHistory(@Param("id") id: string, @Body() history: any) {
    return this.activityService.createHistory(id, history);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.activityService.remove(id);
  }
}
