// src/app/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = `${environment.apiUrl}/api/v2`;
  private authToken = environment.authToken;

  constructor(private http: HttpClient) {}

  findBanners(
    pageIndex: number,
    pageSize: number,
    search: string,
    sortBy: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authToken}`,
    });

    const payload = {
      search: search,
      pageSize: pageSize,
      pageIndex: pageIndex,
      sortBy: sortBy,
    };
    return this.http.post(`${this.apiUrl}/banners/find`, payload, {
      headers,
    });
  }

  findOptions(typeId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authToken}`,
    });

    const payload = {
      typeId: typeId,
    };
    return this.http.post(`${this.apiUrl}/reference-data/find`, payload, {
      headers,
    });
  }

  removeOptions(typeId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authToken}`,
    });

    const payload = {
      typeId: typeId,
    };
    return this.http.post(`${this.apiUrl}/reference-data/find`, payload, {
      headers,
    });
  }
}
