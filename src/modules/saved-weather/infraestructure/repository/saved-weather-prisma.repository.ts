// src/modules/weather/infrastructure/repository/weather.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/services/prisma.service';
import { SavedWeatherRepository } from '../../domain/interfaces/saved-weather-repository.interface';

@Injectable()
export class SavedWeatherPrismaRepository implements SavedWeatherRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any): Promise<any> {
    return this.prisma.savedWeatherForecast.create({ data });
  }

  async findAll(): Promise<any[]> {
    return this.prisma.savedWeatherForecast.findMany();
  }

  async findById(id: string): Promise<any | null> {
    return this.prisma.savedWeatherForecast.findUnique({ where: { id } });
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await this.prisma.savedWeatherForecast.delete({
      where: { id },
    });
    return !!deleted;
  }
}
