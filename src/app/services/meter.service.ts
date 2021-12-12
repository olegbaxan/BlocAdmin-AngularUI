import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MeterService {
  private baseUrl = '/api/v1/meters';

  constructor(private http: HttpClient) { }


  getById(id: string | number | null): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);

  }
  createMeter(meter: any): Observable<any>{
    return  this.http.post(this.baseUrl,meter);
  }
  editMeter(id:number, meter:Object){
    return  this.http.put(this.baseUrl,meter);
  }

  getAll(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl, { params });
  }
  getFilteredMeters(params: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/fm`, { params });
  }

  getPersons(): Observable<any> {
    return this.http.get(`${this.baseUrl}/persons`);
  }
  getBuildingFlats(id:Number|undefined): Observable<any> {
    return this.http.get(`${this.baseUrl}/buildingflats/${id}`);
  }

  getFlats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/flats`);
  }
  getSuppliers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/suppliers`);
  }
  getMeterType(): Observable<any> {
    return this.http.get(`${this.baseUrl}/metertype`);
  }
  getTypeOfMeterInvoice(): Observable<any> {
    return this.http.get(`${this.baseUrl}/typeofmeterinvoice`);
  }
  getBuildings(): Observable<any> {
    return this.http.get(`${this.baseUrl}/buildings`);
  }
  checkSerial(serial: String|undefined ): Observable<any> {
    return this.http.get(`${this.baseUrl}/serial/${serial}`);

  }

}
