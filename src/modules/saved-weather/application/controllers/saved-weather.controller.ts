import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SavedWeatherService } from '../services/saved-weather.service';
import { CreateSavedWeatherCommand } from '../commands/create-saved-weather.command';
import { SavedWeatherDto } from '../models/saved-weather-dto';

@Controller('weather')
export class SavedWeatherController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly savedWeatherService: SavedWeatherService,
  ) {}

  @Post()
  async create(@Body() savedWeatherDto: SavedWeatherDto) {
    const { townCode, provinceCode } = savedWeatherDto;

    return this.commandBus.execute(
      new CreateSavedWeatherCommand(townCode, provinceCode),
    );
  }

  @Get()
  async works() {
    return 'Works';
  }
}
