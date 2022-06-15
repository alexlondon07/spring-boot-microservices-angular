import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Student } from 'src/app/models/Student';
import { StudentService } from 'src/app/services/student.service';
import { MatDialog } from '@angular/material/dialog';
import { StudentFormComponent } from '../create/student-form.component';
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class StudentsComponent implements OnInit, AfterViewInit {

    title = 'Students list';
    students: Student[] = [];
    displayedColumns: string[] = ['id', 'name', 'lastName', 'email', 'createdAt', 'actions'];
    dataSource = new MatTableDataSource();
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild('filter', { static: true }) filter: ElementRef;

    constructor(
      private service: StudentService, 
      public _dialog: MatDialog,
      private changeDetectorRefs: ChangeDetectorRef) { }


    openDialog(): void {
      const dialogRef = this._dialog.open(StudentFormComponent, {
        width: '640px', disableClose: true
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result.data.id > 0){
          this.dataSource.data.push(result.data);
          this.changeDetectorRefs.detectChanges();
        }
        console.log("TCL: StudentsComponent -> result", result)
      });
  
    }

    ngOnInit() {
      this.getData();
    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    getData() {
      this.service.getAllStudents().subscribe(data => {
        this.students = data;
        this.dataSource =  new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    }
}
