import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";

@Schema({
  timestamps: true,
})
export class Feature {
  @Prop()
  name: string;

  @Prop()
  description: string;
}
export const FeatureSchema = SchemaFactory.createForClass(Feature);
