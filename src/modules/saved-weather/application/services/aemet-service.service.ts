import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs'; // Import firstValueFrom

@Injectable()
export class AemetService {
  constructor(private readonly httpService: HttpService) {}

  async getWeather(townCode: string, provinceCode: string) {
    const headerParams = {
      api_key: process.env.AEMET_API_KEY,
    };

    const response = await firstValueFrom(
      this.httpService.get(
        `https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/${provinceCode}${townCode}`,
        {
          headers: headerParams,
        },
      ),
    );

    const weatherData = await firstValueFrom(
      this.httpService.get(response.data.datos),
    );

    const simplifiedData = this.simplifyData(weatherData.data);
    const gachasDays = this.determineGachasDay(simplifiedData);

    return gachasDays;
  }

  private simplifyData(weatherData: any) {
    return weatherData[0].prediccion.dia.splice(0, 3).map((day) => {
      const minTemperature = day.temperatura.minima;
      const maxTemperature = day.temperatura.maxima;

      const maxProbPrecipitacion = Math.max(
        ...day.probPrecipitacion.map((p) => p.value),
      );

      const estadoCielo = day.estadoCielo.find((e) => e.descripcion) || {
        descripcion: 'Unknown',
      };

      return {
        date: day.fecha,
        minTemperature: minTemperature,
        maxTemperature: maxTemperature,
        maxRainProbability: maxProbPrecipitacion,
        skyStatus: estadoCielo.descripcion,
      };
    });
  }

  determineGachasDay(weatherData: any[]) {
    return weatherData.map((day) => {
      const isGachasDay =
        day.maxTemperature < 22 &&
        day.maxRainProbability > 30 &&
        /(nuboso|nublados|lluvia|lluvias)/i.test(day.skyStatus);

      return {
        ...day,
        isGachasDay: isGachasDay,
      };
    });
  }
}
