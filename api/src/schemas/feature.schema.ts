import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { HistoryTypeEnums } from "src/enums/historyType";

@Schema({
  timestamps: true,
})
export class History {
  @Prop()
  description?: string;

  @Prop({ type: String, enum: HistoryTypeEnums })
  type: HistoryTypeEnums;
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
