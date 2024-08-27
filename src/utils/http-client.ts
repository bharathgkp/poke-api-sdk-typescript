/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import ApiResponse from '../responses/response';
import { CacheClass } from 'memory-cache';


export default class HttpClient {
  private client: AxiosInstance;
  private cache: CacheClass<string,any>;
  constructor (baseUrl:string, version: string, cache: any) {
    this.client = axios.create({
      baseURL: `${baseUrl}/${version}/`
    })
    this.cache = cache;


  // Add a request interceptor
  this.client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      console.log('Request:', config); // Log the request configuration
      return config;
    },
    (error) => {
      console.error('Request Error:', error);
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  this.client.interceptors.response.use(
    (response: AxiosResponse) => {
      console.log('Response:', response); // Log the response configuration
      return response;
    },
    (error) => {
      console.error('Response Error:', error.response ? error.response : error);
      return Promise.reject(error);
    }
  );

  }

  public async get<T>(url: string, config?: AxiosRequestConfig, shouldCache?: boolean): Promise<ApiResponse<T>> {

    if(shouldCache) {
      const response: ApiResponse<T>| null = this.cache.get(url);
      if(response) {
        return response;
      }
    }

    try {
    const response: AxiosResponse<T> = await this.client.get(url, config);
    const apiResponse = {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    };
    if(shouldCache) {
      this.cache.put(url, apiResponse, 30000);
    }
    return apiResponse
  }
  catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific error
      throw new Error(error.response?.data || 'Request failed');
    }
    throw new Error('An unexpected error occurred');
  }
  }
}
