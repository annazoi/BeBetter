import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateFeatureDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsOptional()
  @IsArray()
  history: string[];
}
