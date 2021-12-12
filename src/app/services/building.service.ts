import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  private baseUrl = '/api/v1/buildings';

  constructor(private http: HttpClient) { }


  getById(id: string | number | null): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);

  }
  createBuilding(building: any): Observable<any>{
    return  this.http.post(this.baseUrl,building);
  }

    editBuilding(id: Number | undefined, building: Object){
    return  this.http.put(this.baseUrl,building);
  }

  getAll(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl, { params });
  }

  getAddresses(): Observable<any> {
    return this.http.get(`${this.baseUrl}/address`);
  }
}
