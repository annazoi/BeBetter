import { IsArray, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { HistoryTypeEnums } from "src/enums/historyType";

export class CreateActivityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(["percentage", "numeric", "boolean"])
  type: string;

  @IsNumber()
  @IsOptional()
  goalValue?: number;

  @IsString()
  @IsOptional()
  unit?: string;

  @IsOptional()
  @IsArray()
  history: string[];
}

export class CreateHistoryDto {
  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty()
  type: HistoryTypeEnums;

  @IsNumber()
  @IsOptional()
  value?: number;
}
