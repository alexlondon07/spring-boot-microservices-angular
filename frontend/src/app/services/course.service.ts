import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Course } from '../models/Course';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends CommonService<Course> {

  protected baseEnpoint = `${environment.API_URL}/courses`;
}