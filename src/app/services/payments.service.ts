import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Payments} from '../model/Payments';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  private baseUrl = environment.apiUrl + '/api/v1/payments';

  constructor(private http: HttpClient) {
  }


  getById(id: string | number | null): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);

  }

  createPayments(payment: Payments[]): Observable<any> {
    return this.http.post(this.baseUrl, payment);
  }

  getAll(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl, {params});
  }

  getPersons(): Observable<any> {
    return this.http.get(`${this.baseUrl}/persons`);
  }

  getFlats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/flats`);
  }

  getPersonFlats(id: string | number | null): Observable<any> {
    return this.http.get(`${this.baseUrl}/personflats/${id}`);
  }

  getFlatInvoices(id: string | number | null): Observable<any> {
    return this.http.get(`${this.baseUrl}/flatinvoices/${id}`);
  }

  getPersonPayments(id: string | number | null): Observable<any> {
    return this.http.get(`${this.baseUrl}/person/${id}`);
  }
}
