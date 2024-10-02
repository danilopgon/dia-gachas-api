import { IsNotEmpty, IsString } from 'class-validator';

export class SavedWeatherDto {
  @IsString()
  @IsNotEmpty()
  townCode: string;

  @IsString()
  @IsNotEmpty()
  provinceCode: string;
}
