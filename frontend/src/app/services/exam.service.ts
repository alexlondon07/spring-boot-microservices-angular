import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Exam } from '../models/Exam';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExamService extends CommonService<Exam> {
  protected baseEnpoint = `${environment.API_URL}/exams`;
}