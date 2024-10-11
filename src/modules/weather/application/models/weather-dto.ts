import { IsNotEmpty, IsString } from 'class-validator';

export class WeatherDto {
  @IsString()
  @IsNotEmpty()
  townCode: string;

  @IsString()
  @IsNotEmpty()
  provinceCode: string;
}
