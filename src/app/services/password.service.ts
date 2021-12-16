import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.prod';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  private baseUrl = environment.apiUrl + '/api/v1/password';

  constructor(private http: HttpClient,
              private router: Router,) {
  }

  sendEmail(email: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgot`, email);
  }

  resetPassword(token: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset`, {
      token,
      password
    }, httpOptions);
  }

  changePassword(username: String, oldpassword: String, newpassword: String): Observable<any> {
    return this.http.post(`${this.baseUrl}/changepassword`, {
      username,
      oldpassword,
      newpassword
    }, httpOptions);
  }
}
