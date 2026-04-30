import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryResponse, create_Category } from '../../data_type/category/category_service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private url: string = 'http://localhost:4000/api/v1/salon';

  constructor(private http: HttpClient) {}

  create_service(servicesdata: create_Category) {
    return this.http.post(`${this.url}/create_service-category`, servicesdata);
  }

  get_service_category() {
    return this.http.get<CategoryResponse>(`${this.url}/get_service-category`);
  }

  delete_service_category(id: string) {
    return this.http.delete(`${this.url}/delete_service-category/${id}`);
  }

  update_service_category(id: string, data: create_Category) {
    return this.http.put(`${this.url}/update_service-category/${id}`, data);
  }
}
