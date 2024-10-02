import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SavedWeatherModule } from './modules/saved-weather/saved-weather.module';

@Module({
  imports: [ConfigModule.forRoot(), SavedWeatherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
