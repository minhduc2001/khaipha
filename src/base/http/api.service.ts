import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import axios, { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import * as exc from '@base/api/exception.reslover';
@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService) {}

  get<T>(url: string, config?: any): Observable<AxiosResponse<T>> {
    return this.httpService.get<T>(url, config);
  }

  post<T>(url: string, data?: any, config?: any): Observable<AxiosResponse<T>> {
    return this.httpService.post<T>(url, data, config);
  }

  async getAxios(url) {
    try {
      return await axios.get(url);
    } catch (e) {
      throw new exc.BadException({ message: 'null' });
    }
  }
}
