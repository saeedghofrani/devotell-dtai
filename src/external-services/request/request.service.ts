import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { firstValueFrom, catchError, retry } from 'rxjs';

@Injectable()
export class RequestService {
  private readonly logger = new Logger(RequestService.name);

  public constructor(private readonly httpService: HttpService) {}

  public async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response = await firstValueFrom(
        this.httpService.request<T>(config).pipe(
          retry(2),
          catchError((error: AxiosError) => {
            this.logger.error(
              `Request failed: ${error?.config?.url}`,
              error.message,
            );
            throw error;
          }),
        ),
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, url, method: 'GET' });
  }

  public async post<T, K>(
    url: string,
    data?: K,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>({ ...config, url, method: 'POST', data });
  }

  public async put<T, K>(
    url: string,
    data?: K,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>({ ...config, url, method: 'PUT', data });
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, url, method: 'DELETE' });
  }
}
