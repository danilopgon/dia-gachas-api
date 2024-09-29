import { Module } from '@nestjs/common';
import { SavedWeatherController } from './application/controllers/saved-weather.controller';
import { SavedWeatherService } from './application/saved-weather.service';
import { PrismaService } from '../../shared/services/prisma.service';
import { SavedWeatherPrismaRepository } from './infraestructure/repository/saved-weather-prisma.repository';

@Module({
  imports: [],
  controllers: [SavedWeatherController],
  providers: [
    SavedWeatherService,
    PrismaService,
    {
      provide: 'SavedWeatherRepository',
      useClass: SavedWeatherPrismaRepository,
    },
  ],
})
export class SavedWeather {}
