import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FlatService {
  private baseUrl = '/api/v1/flats';

  constructor(private http: HttpClient) { }


  getById(id: string | number | null): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);

  }

  getAvailableFlatsByBuildingId(id: Number | undefined): Observable<any> {
    return this.http.get(`${this.baseUrl}/available/${id}`);
  }
  createFlat(flat: any): Observable<any>{
    return  this.http.post(this.baseUrl,flat);
  }

    editFlat(id: Number | undefined, flat: Object){
    return  this.http.put(this.baseUrl,flat);
  }

  getAll(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl, { params });
  }
  getAllNegativeWallet(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/allnegativewallet`);
  }

  getPersons(): Observable<any> {
    return this.http.get(`${this.baseUrl}/persons`);
  }
  getBuildings(): Observable<any> {
    return this.http.get(`${this.baseUrl}/buildings`);
  }
  getMeters(): Observable<any> {
    return this.http.get(`${this.baseUrl}/meters`);
  }
}
