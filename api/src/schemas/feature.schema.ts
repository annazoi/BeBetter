import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { Types } from "mongoose";
@Schema({
  timestamps: true,
})
export class Feature {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: "User" })
  userId: Types.ObjectId;
}
export const FeatureSchema = SchemaFactory.createForClass(Feature);
