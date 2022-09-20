import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Generic } from '../models/Generic';

@Injectable({
  providedIn: 'root'
})
export abstract class CommonService<E extends Generic> {

    protected baseEnpoint: string;

    protected headers: HttpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });

    constructor(protected http: HttpClient) { }

    public getAll(): Observable<E[]> {
      return this.http.get<E[]>(`${environment.API_URL}`);
    }

    public getAllPages(page: string, size: string): Observable<any> {
      const params = new HttpParams()
        .set('page', page)
        .set('size', size)
      return this.http.get<any>(`${this.baseEnpoint}/page/${page}/${size}`, { params: params });
    }
    
    public getAllPagesWithText(page: string, size: string, text: string): Observable<any> {
      console.log('oeee', `${this.baseEnpoint}/page/${page}/${size}/${text}`);
      const params = new HttpParams()
        .set('page', page)
        .set('size', size)
        .set('text', text)
      return this.http.get<any>(`${this.baseEnpoint}/page/${page}/${size}/${text}`, { params: params });
    }

    public getById(id: number): Observable<E> {
      return this.http.get<E>(`${this.baseEnpoint}/${id}`);
    }

    public create(data: E): Observable<E> {
      return this.http.post<E>(`${this.baseEnpoint}/`, data, { headers: this.headers });
    }

    public update(data: E): Observable<E> {
      return this.http.put<E>(`${this.baseEnpoint}/${data['id']}`, data, { headers: this.headers })
    }

    public delete(id: number): Observable<E> {
      return this.http.delete<E>(`${this.baseEnpoint}/${id}`)
    }

}
