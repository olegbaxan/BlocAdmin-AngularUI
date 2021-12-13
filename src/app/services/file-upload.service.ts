import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
// import {ResponseContentType} from '@angular/http';
import {InvoiceService} from "./invoice.service";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private baseUrl = '/api/v1/files';

  constructor(private http: HttpClient,
              private invoiceService:InvoiceService) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/list`);
  }

  getFilesById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

}
