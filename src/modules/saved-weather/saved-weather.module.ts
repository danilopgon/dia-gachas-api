import { Module } from '@nestjs/common';
import { SavedWeatherController } from './application/controllers/saved-weather.controller';
import { SavedWeatherService } from './application/services/saved-weather.service';
import { PrismaService } from '../../shared/services/prisma.service';
import { SavedWeatherPrismaRepository } from './infraestructure/repository/saved-weather-prisma.repository';
import { AemetService } from './application/services/aemet-service.service';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateSavedWeatherHandler } from './application/handlers/create-saved-weather.handler';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [CqrsModule, HttpModule],
  controllers: [SavedWeatherController],
  providers: [
    SavedWeatherService,
    PrismaService,
    {
      provide: 'SavedWeatherRepository',
      useClass: SavedWeatherPrismaRepository,
    },
    AemetService,
    CreateSavedWeatherHandler,
  ],
})
export class SavedWeatherModule {}
