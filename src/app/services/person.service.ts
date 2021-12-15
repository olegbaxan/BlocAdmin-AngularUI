import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from '../../environments/environment.prod';



@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private baseUrl = environment.apiUrl + '/api/v1/person';

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(this.baseUrl + '/all', { responseType: 'text' });
  }

  getPersonBoard(): Observable<any> {
    return this.http.get(this.baseUrl + '/user', { responseType: 'text' });
  }

  getBlocAdminBoard(): Observable<any> {
    return this.http.get(this.baseUrl + '/mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(this.baseUrl + '/admin', { responseType: 'text' });
  }
  getById(id: string | number | null): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);

  }
  createPerson(person: any): Observable<any>{
    return  this.http.post(this.baseUrl,person);
  }
  editPerson(id:Number|undefined, person:Object|undefined){
    return  this.http.put(this.baseUrl,person);
  }
  deletePerson(id:Number|undefined){
    return  this.http.delete(`${this.baseUrl}/${id}`);
  }

  getAll(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl, { params });
  }

  getRoles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/roles`);
  }
  checkUsername(username: String|undefined ): Observable<any> {
    return this.http.get(`${this.baseUrl}/username/${username}`);

  }
  checkIdnp(idnp: String|undefined ): Observable<any> {
    return this.http.get(`${this.baseUrl}/idnp/${idnp}`);

  }
}
