import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Exam } from '../models/Exam';
import { environment } from 'src/environments/environment';
import { Subject } from '../models/Subject';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExamService extends CommonService<Exam> {
  protected baseEnpoint = `${environment.API_URL}/exams`;

  constructor(http: HttpClient){
    super(http);
  }

  public getAlllSubjects(): Observable<Subject[]>{
    return this.http.get<Subject[]>(`${this.baseEnpoint}/subjects`);
  }
}