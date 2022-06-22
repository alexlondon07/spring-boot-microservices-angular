import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Student } from 'src/app/models/Student';
import { StudentService } from 'src/app/services/student.service';
import { MatDialog } from '@angular/material/dialog';
import { StudentFormComponent } from '../create/student-form.component';
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit, AfterViewInit {

  dialogRef: MatDialog;
  title = 'Students list';
  students: Student[] = [];
  totalElements: number = 0;
  pageIndex: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  displayedColumns: string[] = ['id', 'name', 'lastName', 'email', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  constructor(
    private service: StudentService,
    public _dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    this.getDataPage(this.pageIndex, this.pageSize);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(student): void {
    const dialogRef = this._dialog.open(StudentFormComponent, {
      width: '640px',
      disableClose: true,
      data: student
    });
    dialogRef.afterClosed().subscribe(result => {
      this.validateResponse(result);
    });
  }

  validateResponse(result: any) {
    if (result.data?.id > 0 && result.method === 'create') {
      this.dataSource.data.push(result.data);
    } else {
      // TODO
    }
    this.changeDetectorRefs.detectChanges();
  }

  getData() {
    this.service.getAll().subscribe(data => {
      this.students = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  delete(id: number) {
    this.service.delete(id).subscribe(data => {
      this.dataSource.data = this.students.filter(item => item.id !== id);
      this.changeDetectorRefs.detectChanges();
    }, error => {
      console.log(error.error.message);
    });
  }

  nextPage(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getDataPage(this.pageIndex.toString(), this.pageSize.toString());
  }

  getDataPage(page, size) {
    this.service.getAllPages(page, size)
      .subscribe((data) => {
        this.dataSource = data['content'];
        this.students = data['content'];
        this.totalElements = data['totalElements'] as number;
      }, error => {
        console.log(error.error.message);
      });
  }
}
