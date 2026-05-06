import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceResponse } from '../../data_type/service/servicetype';
import { SingleServiceResponse } from '../../data_type/service/edit_services';

@Injectable({
  providedIn: 'root',
})
export class ApiData {
  private url: string = 'http://localhost:4000/api/v1/salon';

  constructor(private http: HttpClient) {}

  get_services() {
    return this.http.get<ServiceResponse>(`${this.url}/services`);
  }

  delete_service(userId: string) {
    return this.http.delete(`${this.url}/delete_service/${userId}`);
  }

  create_service(data: FormData) {
    return this.http.post(`${this.url}/create-service`, data);
  }
  get_service_by_id(userId: string) {
    return this.http.get<SingleServiceResponse>(`${this.url}/single_service/${userId}`);
  }

  update_service(userId: string, data: FormData) {
    return this.http.put<SingleServiceResponse>(`${this.url}/update_service/${userId}`, data);
  }
}
