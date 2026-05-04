import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, CreateStaffPayload } from '../data_staff';

@Injectable({
  providedIn: 'root',
})
export class Data {
  private url: string = 'http://localhost:4000/api/v1/salon';

  constructor(private http: HttpClient) {}

  getStaff() {
    return this.http.get<ApiResponse>(`${this.url}/get-staff`);
  }

  deleteStaff(id: string) {
    return this.http.delete(`${this.url}/delete-staff/${id}`);
  }

  createStaff(staffData: CreateStaffPayload) {
    return this.http.post(`${this.url}/create-staff`, staffData);
  }
}
