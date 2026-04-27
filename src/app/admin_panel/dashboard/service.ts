import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddUserdata, Userdata, UsersResponse } from '../../data_type/signup';
import { single_UsersResponse } from '../../data_type/single_user';

@Injectable({
  providedIn: 'root',
})
export class Service {
  private url: string = 'http://localhost:4000/api/v1/salon';

  constructor(private http: HttpClient) {}

  get_users() {
    return this.http.get<UsersResponse>(`${this.url}/get_user`);
  }

  deleteUser(userId: string) {
    return this.http.delete(`${this.url}/delete_user/${userId}`);
  }

  addUser(userData: AddUserdata) {
    return this.http.post(`${this.url}/signup`, userData);
  }

  single_user(userId: string) {
    return this.http.get<single_UsersResponse>(`${this.url}/single-user/${userId}`);
  }

  // ADD THIS METHOD FOR UPDATE
  updateUser(userId: string, userData: any) {
    return this.http.put(`${this.url}/edit_user/${userId}`, userData);
  }
}