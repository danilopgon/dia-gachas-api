import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { WeatherDto } from '../models/weather-dto';
import { AemetService } from '../services/aemet-.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly aemetService: AemetService) {}

  @Post()
  async fetchWeatherData(@Body() weatherDto: WeatherDto) {
    try {
      const { townCode, provinceCode } = weatherDto;
      const weather = await this.aemetService.getWeather(
        townCode,
        provinceCode,
      );
      return { status: 'ok', data: weather };
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }

  @Get(':provinceCode/:townCode')
  async getByWeatherDataParams(@Param() params: any) {
    try {
      const { townCode, provinceCode } = params;

      const weather = await this.aemetService.getWeather(
        townCode,
        provinceCode,
      );
      return { status: 'ok', data: weather };
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }
}
