import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({
  timestamps: true,
})
export class History {
  @Prop()
  destription: string;

  @Prop()
  type: string;
}
export const HistorySchema = SchemaFactory.createForClass(History);

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

  @Prop({ type: [HistorySchema] })
  history: History[];
}
export const FeatureSchema = SchemaFactory.createForClass(Feature);
