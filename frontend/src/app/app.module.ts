import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators'; // <-- #2 import module

import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav'; import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './layout/header.component';
import { MenuItemComponent } from './layout/menu-item/menu-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

import { APP_BASE_HREF } from '@angular/common';
import { PageHeaderComponent } from './layout/page-header.component';
import { SalesComponent } from './sales.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StudentsComponent } from './components/students/list/students.component';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";

import { A11yModule } from '@angular/cdk/a11y';
import { BidiModule } from '@angular/cdk/bidi';
import { ObserversModule } from '@angular/cdk/observers';
import { OverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform';
import { PortalModule } from '@angular/cdk/portal';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { StudentFormComponent } from './components/students/create/student-form.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { CoursesComponent } from './components/courses/list/courses.component';
import { CourseFormComponent } from './components/courses/create/course-form.component';
import { ExamsComponent } from './components/exams/list/exams.component';
import { ExamFormComponent } from './components/exams/create/exam-form.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'students',
        component: StudentsComponent,
      },
      {
        path: 'students/:id',
        component: StudentFormComponent,
      },
      {
        path: 'courses',
        component: CoursesComponent,
      },
      {
        path: 'courses/:id',
        component: CourseFormComponent,
      },
      {
        path: 'exams',
        component: ExamsComponent,
      },
      {
        path: 'exams/:id',
        component: ExamFormComponent,
      },
      {
        path: 'sales',
        component: SalesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    // CDK
    A11yModule,
    BidiModule,
    ObserversModule,
    OverlayModule,
    PlatformModule,
    PortalModule,
    CdkStepperModule,
    CdkTableModule,

    // Material Design
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule, MatTableModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatMenuModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatFormFieldModule,
    MatPseudoCheckboxModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,

    ReactiveFormsModule,
    RxReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    MenuItemComponent,
    PageHeaderComponent,
    HomeComponent,
    SalesComponent,
    CoursesComponent,
    StudentsComponent,
    StudentFormComponent,
    CourseFormComponent,
    ExamFormComponent,
    ExamsComponent,
    ConfirmDialogComponent,
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: APP_BASE_HREF, useValue: '' }],
  entryComponents: [StudentFormComponent, CourseFormComponent, ExamFormComponent, ConfirmDialogComponent]
})
export class AppModule { }
