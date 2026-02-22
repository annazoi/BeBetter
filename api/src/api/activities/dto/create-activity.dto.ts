import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { HistoryTypeEnums } from "src/enums/historyType";

export class CreateActivityDto {
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

export class CreateHistoryDto {
  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty()
  type: HistoryTypeEnums;
}
