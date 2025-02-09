import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import httpClient from "./httpClient";

export abstract class ProtectedApiService {
  protected httpClient: AxiosInstance;

  constructor() {
    this.httpClient = httpClient;
  }

  protected responseHandler<T = unknown>({ data }: AxiosResponse<T>) {
    return data;
  }

  protected async get<T = unknown>(url: string, config?: AxiosRequestConfig) {
    return await this.httpClient.get<T>(url, config);
  }

  protected async post<T = unknown, B = unknown>(
    url: string,
    body: B,
    config?: AxiosRequestConfig
  ) {
    return await this.httpClient.post<T>(url, body, config);
  }

  protected async put<T = unknown, B = unknown>(
    url: string,
    body: B,
    config?: AxiosRequestConfig
  ) {
    return await this.httpClient.put<T>(url, body, config);
  }

  protected async patch<T = unknown, B = unknown>(
    url: string,
    body?: B,
    config?: AxiosRequestConfig
  ) {
    return await this.httpClient.patch<T>(url, body, config);
  }

  protected async delete<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ) {
    return await this.httpClient.delete<T>(url, config);
  }
}
