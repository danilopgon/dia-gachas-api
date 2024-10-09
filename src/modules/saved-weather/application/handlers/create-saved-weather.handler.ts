import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSavedWeatherCommand } from '../commands/create-saved-weather.command';
import { SavedWeatherService } from '../services/saved-weather.service';
import { AemetService } from '../services/aemet-service.service';

@CommandHandler(CreateSavedWeatherCommand)
export class CreateSavedWeatherHandler
  implements ICommandHandler<CreateSavedWeatherCommand>
{
  constructor(
    private readonly weatherService: SavedWeatherService,
    private readonly aemetService: AemetService,
  ) {}

  async execute(command: CreateSavedWeatherCommand): Promise<any> {
    const { townCode, provinceCode } = command;

    const weather = await this.aemetService.getWeather(townCode, provinceCode);

    return { status: 'ok', data: weather };
  }
}
