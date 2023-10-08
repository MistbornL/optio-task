// src/app/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = `${environment.apiUrl}/api/v2/banners`;
  private authToken = environment.authToken;

  constructor(private http: HttpClient) {}

  findBanners(pageIndex: number, pageSize: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authToken}`,
    });

    const payload = { search: '', pageSize: pageSize, pageIndex: pageIndex };
    return this.http.post(`${this.apiUrl}/find`, payload, { headers });
  }
}
