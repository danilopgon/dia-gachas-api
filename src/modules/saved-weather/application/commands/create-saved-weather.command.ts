export class CreateSavedWeatherCommand {
  constructor(
    public readonly townCode: string,
    public readonly provinceCode: string,
  ) {}
}
