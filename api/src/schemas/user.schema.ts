import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  username: string;

  @Prop()
  fullName: string;

  @Prop()
  password: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
