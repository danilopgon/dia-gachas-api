import { Inject, Injectable } from '@nestjs/common';
import { SavedWeatherServiceInterface } from './interfaces/saved-weather.service.interface';

@Injectable()
export class SavedWeatherService implements SavedWeatherServiceInterface {
  constructor(
    @Inject('SavedWeatherRepository')
    private readonly savedWeatherRepository: any,
  ) {}

  async create(data: any): Promise<any> {
    return this.savedWeatherRepository.create(data);
  }

  async findAll(): Promise<any[]> {
    return this.savedWeatherRepository.findAll();
  }

  async findById(id: string): Promise<any | null> {
    return this.savedWeatherRepository.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    return this.savedWeatherRepository.delete(id);
  }
}
