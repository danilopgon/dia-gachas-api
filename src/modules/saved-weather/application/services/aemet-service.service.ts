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
    return weatherData[0].prediccion.dia.splice(0, 2).map((day) => {
      const noonTemperature = day.temperatura.dato.find((t) => t.hora === 12);
      const afternoonTemperature = day.temperatura.dato.find(
        (t) => t.hora === 18,
      );

      const launchTemperature =
        (noonTemperature.value + afternoonTemperature.value) / 2;

      const launchTimeRainProbability = day.probPrecipitacion.find(
        (p) => p.periodo === '12-18',
      ).value;

      const estadoCielo = day.estadoCielo.find((e) => e.descripcion) || {
        descripcion: 'Unknown',
      };

      return {
        date: day.fecha,
        launchTemperature: launchTemperature,
        launchTimeRainProbability: launchTimeRainProbability,
        skyStatus: estadoCielo.descripcion,
      };
    });
  }

  determineGachasDay(weatherData: any[]) {
    return weatherData.map((day) => {
      const isDayForGachas =
        day.launchTemperature < 20 &&
        day.launchTimeRainProbability > 30 &&
        /(nuboso|nubosos|nublados|lluvia|lluvias)/i.test(day.skyStatus);

      return {
        ...day,
        isDayForGachas: isDayForGachas,
      };
    });
  }
}
