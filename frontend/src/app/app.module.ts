import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoursesComponent } from './components/courses/courses.component';
import { ExamsComponent } from './components/exams/exams.component';
import { StudentsComponent } from './components/students/students.component';
import { MaterialModule } from './app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    AppComponent,
    ExamsComponent,
    CoursesComponent,
    StudentsComponent

  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
