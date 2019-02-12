import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserTableService {

  private baseUrl = 'http://localhost:8000/api';
  constructor(private http: HttpClient) { }

  signup(data){
    return this.http.post(`${this.baseUrl}/signup`, data);
  }

  login(data){
    return this.http.post(`${this.baseUrl}/login`, data);
  }
}
