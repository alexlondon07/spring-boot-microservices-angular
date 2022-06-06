import { RouterModule, Routes } from "@angular/router";
import { StudentsComponent } from "./components/students/students.component";
import { NgModule } from '@angular/core';
import { CoursesComponent } from "./components/courses/courses.component";
import { ExamsComponent } from "./components/exams/exams.component";

const routes:Routes = [
  {path:'students', pathMatch: 'full', component: StudentsComponent},
  {path:'exams', pathMatch: 'full', component: ExamsComponent},
  {path:'courses', pathMatch: 'full', component: CoursesComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
