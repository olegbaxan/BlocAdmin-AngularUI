import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

   private baseUrl = environment.apiUrl + '/api/v1/suppliers';

  constructor(private http: HttpClient) { }


  getById(id: string | number | null): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);

  }
  createSupplier(supplier: any): Observable<any>{
    return  this.http.post(this.baseUrl,supplier);
  }

    editSupplier(id: Number | undefined, supplier: Object){
    return  this.http.put(this.baseUrl,supplier);
  }

  getAll(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl, { params });
  }

  getAddresses(): Observable<any> {
    return this.http.get(`${this.baseUrl}/address`);
  }
}
