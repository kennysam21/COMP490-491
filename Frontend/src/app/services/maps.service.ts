import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Location {
  latitude: number;
  longitude: number;
  country_name: string;
  region_code: string;
  city: string;
}

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  constructor(private http: HttpClient) { }

  getLocation(){
    return this.http.get<Location>('http://api.ipapi.com/api/check?access_key=55abc1252aaf79ede76a9210e9445a74');
  }
}
