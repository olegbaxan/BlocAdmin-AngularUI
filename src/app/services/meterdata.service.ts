import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MeterData} from "../model/MeterData";

@Injectable({
  providedIn: 'root'
})
export class MeterdataService {

  private baseUrl = '/api/v1/meterdata';

  constructor(private http: HttpClient) {
  }


  getById(id: string | number | null): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);

  }

  createMeterData(meterdata: any): Observable<any> {
    return this.http.post(this.baseUrl, meterdata);
  }
  createBulkMeterData(metersdata: MeterData[]): Observable<any> {
    console.log("Send MeterData",metersdata);
    return this.http.post(`${this.baseUrl}/addbulk`, metersdata);
  }

  editMeterData(id: Number|undefined, meterdata: Object) {
    console.log("ServiceMeterData=",meterdata);
    return this.http.put(this.baseUrl, meterdata);
  }
  editCurrentValue(params:any) {
    return this.http.put(`${this.baseUrl}/edit`,{params});
  }

  getAll(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl, {params});
  }
  getAllNew(params: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/new`, {params});
  }
  getMeters(): Observable<any> {
    return this.http.get(`${this.baseUrl}/meters`);
  }

  getInvoices(supplierName:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/invoices/${supplierName}`);
  }
  getFlatsByBuilding(buildingid:number): Observable<any> {
    return this.http.get(`${this.baseUrl}/flats/${buildingid}`);
  }

  getStatus(): Observable<any> {
    return this.http.get(`${this.baseUrl}/status`);
  }

  getPreviuosMeterData(id: any) {
    return this.http.get<number>(`${this.baseUrl}/getprevious/${id}`);
  }
  getMaxPreviuosMeterData(id: any) {
    return this.http.get<number>(`${this.baseUrl}/maxprev/${id}`);
  }
}
