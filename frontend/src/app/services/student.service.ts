import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student } from '../models/Student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private headers: HttpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) {}

  public getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${environment.API_URL}/students/`);
  }

  public getAllStudentsPages(page: string, size: string): Observable<any> {
    const params = new HttpParams()
    .set('page', page)
    .set('size', size)
    return this.http.get<any>(`${environment.API_URL}/students/page/${page}/${size}`, { params: params});
  }

  public getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${environment.API_URL}/students/${id}`);
  }

  public createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${environment.API_URL}/students/`, student, { headers: this.headers});
  }

  public updateStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${environment.API_URL}/students/${student.id}`, student, { headers: this.headers})
  }

  public deleteStudent(id: number): Observable<Student> {
    return this.http.delete<Student>(`${environment.API_URL}/students/${id}`)
  }

}
