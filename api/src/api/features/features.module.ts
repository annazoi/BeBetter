import { Module } from "@nestjs/common";
import { FeatureService } from "./features.service";
import { FeatureController } from "./features.controller";

@Module({
  controllers: [FeatureController],
  providers: [FeatureService],
})
export class FeaturesModule {}
