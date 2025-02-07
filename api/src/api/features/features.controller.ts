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
import { FeatureService } from "./features.service";
import { CreateFeatureDto } from "./dto/create-feature.dto";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Feature } from "src/schemas/feature.schema";
import { JwtGuard } from "../auth/guard";

@UseGuards(JwtGuard)
@Controller("features")
@ApiTags("Feautues")
@ApiBearerAuth()
export class FeatureController {
  constructor(private featureService: FeatureService) {}

  @Post()
  @ApiOkResponse({ type: Feature })
  async create(
    @Body() createFeatureDto: CreateFeatureDto,
    @Req() req: Express.Request
  ) {
    const { userId } = req.user;

    return this.featureService.create(createFeatureDto, userId);
  }

  @Get()
  @ApiOkResponse({ type: Feature })
  async findAll(@Query() query: any) {
    return this.featureService.findAll(query);
  }

  @Get(":id")
  @ApiOkResponse({ type: Feature })
  findOne(@Param("id") id: string) {
    return this.featureService.findOne(id);
  }

  @Post(":id/history")
  @ApiOkResponse({ type: Feature })
  async createHistory(@Param("id") id: string, @Body() history: any) {
    return this.featureService.createHistory(id, history);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.featureService.remove(+id);
  }
}
