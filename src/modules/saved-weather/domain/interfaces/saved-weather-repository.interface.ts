export interface SavedWeatherRepository {
  create(data: any): Promise<any>;
  findAll(): Promise<any[]>;
  findById(id: string): Promise<any | null>;
  delete(id: string): Promise<boolean>;
}
