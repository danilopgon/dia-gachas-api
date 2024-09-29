import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SavedWeather } from './modules/saved-weather/saved-weather.module';

@Module({
  imports: [ConfigModule.forRoot(), SavedWeather],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
