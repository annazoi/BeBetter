import { Module } from "@nestjs/common";
import { FeatureService } from "./features.service";
import { FeatureController } from "./features.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { FeatureSchema } from "src/schemas/feature.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Feature", schema: FeatureSchema }]),
  ],
  exports: [FeatureService],
  controllers: [FeatureController],
  providers: [FeatureService],
})
export class FeatureModule {}
