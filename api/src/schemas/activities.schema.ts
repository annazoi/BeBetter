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

  @Prop({ type: Number, required: false })
  value?: number;
}
export const HistorySchema = SchemaFactory.createForClass(History);

@Schema({
  timestamps: true,
})
export class Activity {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ type: String, enum: ['percentage', 'numeric', 'boolean'], required: true })
  type: string;

  @Prop({ type: Number, required: false })
  goalValue?: number;

  @Prop({ type: String, required: false })
  unit?: string;

  @Prop({ type: Types.ObjectId, ref: "User" })
  userId: Types.ObjectId;

  @Prop({ type: [HistorySchema] })
  history: History[];
}
export const ActivitySchema = SchemaFactory.createForClass(Activity);
