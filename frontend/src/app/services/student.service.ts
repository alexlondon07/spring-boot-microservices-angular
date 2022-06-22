import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student } from '../models/Student';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends CommonService<Student> {

  protected baseEnpoint = `${environment.API_URL}/students`;

}
