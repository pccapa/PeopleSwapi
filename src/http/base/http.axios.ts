import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import axiosRateLimit, { RateLimitedAxiosInstance } from 'axios-rate-limit';

export abstract class HttpClient {
  private httpClient: AxiosInstance;
  private limitedHttp: RateLimitedAxiosInstance;

  constructor(private baseUrl: string) {}

  protected setup(configService: ConfigService) {
    this.httpClient = axios.create({
      baseURL: this.baseUrl,
      timeout: Number(configService.get<number>('HTTP_TIMEOUT')),
      headers: { 'Content-Type': 'application/json' },
    });
    this.limitedHttp = axiosRateLimit(this.httpClient, {
      maxRequests: Number(configService.get<number>('HTTP_MAX_REQUEST')),
      perMilliseconds: Number(configService.get<number>('HTTP_REQUEST_PER_MILIS')),
    });
  }

  protected async get<T>(url: string): Promise<T> {
    return (await this.limitedHttp.get<T>(url)).data;
  }
}
