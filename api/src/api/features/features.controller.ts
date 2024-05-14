import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { FeatureService } from "./features.service";
import { CreateFeatureDto } from "./dto/create-feature.dto";
import { UpdateFeatureDto } from "./dto/update-feature.dto";
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
  findOne(@Param("id") id: string) {
    return this.featureService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateFeatureDto: UpdateFeatureDto) {
    return this.featureService.update(+id, updateFeatureDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.featureService.remove(+id);
  }
}
