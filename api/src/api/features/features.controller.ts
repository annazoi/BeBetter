import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { FeatureService } from "./features.service";
import { CreateFeatureDto } from "./dto/create-feature.dto";
import { UpdateFeatureDto } from "./dto/update-feature.dto";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Feature } from "src/schemas/feature.schema";

@Controller("features")
@ApiTags("Feautues")
export class FeatureController {
  constructor(private featureService: FeatureService) {}

  @Post()
  @ApiOkResponse({ type: Feature })
  async create(@Body() createFeatureDto: CreateFeatureDto) {
    return this.featureService.create(createFeatureDto);
  }

  @Get()
  findAll() {
    return this.featureService.findAll();
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
