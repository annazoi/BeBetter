import { Module } from "@nestjs/common";
import { ActivityService } from "./activities.service";
import { ActivityController } from "./activities.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { ActivitySchema } from "src/schemas/activities.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Activity", schema: ActivitySchema }]),
  ],
  exports: [ActivityService],
  controllers: [ActivityController],
  providers: [ActivityService],
})
export class ActivityModule { }
