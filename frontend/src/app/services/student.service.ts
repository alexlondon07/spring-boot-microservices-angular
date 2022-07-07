import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Student } from "../models/Student";
import { CommonService } from "./common.service";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: "root",
})
export class StudentService extends CommonService<Student> {
  protected baseEnpoint = `${environment.API_URL}/students`;
  public formData = new FormData();

  constructor(http: HttpClient) {
    super(http);
  }

  public createWithImage(student: Student, file: File): Observable<Student> {
    const formData = this.buildFormData(student, file);
    return this.http.post<Student>(this.baseEnpoint + "/create-with-image", formData);
  }

  public editWithImage(student: Student, file: File): Observable<Student> {
    const formData = this.buildFormData(student, file);
    return this.http.put<Student>(`${this.baseEnpoint}/${student.id}/update-with-image/`, formData);
  }

  public buildFormData(student: Student, file: File){
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", student.name);
    formData.append("lastName", student.lastName);
    formData.append("email", student.email);
    return formData;
  }
}
