import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Student } from "src/app/models/Student";
import { StudentService } from "src/app/services/student.service";
import { MatDialog } from "@angular/material/dialog";
import { StudentFormComponent } from "../create/student-form.component";
import { ConfirmDialogComponent } from "../../../shared/confirm-dialog/confirm-dialog.component";
import { environment } from "src/environments/environment";
import { AppSettings } from "src/app/config/app";
@Component({
  selector: "app-students",
  templateUrl: "./students.component.html",
  styleUrls: ["./students.component.css"],
})
export class StudentsComponent implements OnInit, AfterViewInit {
  dialogRef: MatDialog;
  title = "Students list";
  dataList: Student[] = [];
  totalElements: number = 0;
  pageIndex: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  baseEnpoint = `${environment.API_URL}/students/`;

  displayedColumns: string[] = [
    "actions",
    "name",
    "lastName",
    "email",
    "image"
  ];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private service: StudentService,
    public _dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getDataPage(this.pageIndex, this.pageSize);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.getDataPageWithText(
      this.pageIndex,
      this.pageSize,
      filterValue.trim().toLowerCase().toString()
    );
  }

  openDialog(student): void {
    const dialogRef = this._dialog.open(StudentFormComponent, {
      width: "640px",
      disableClose: true,
      data: student,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result.data?.id > 0){
        this.getDataPage(this.pageIndex, this.pageSize);
      }
    });
  }

  detectChanges(){
    this.changeDetectorRefs.detectChanges();
  }

  getData() {
    this.service.getAll().subscribe((data) => {
      this.dataList = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  delete(id: number) {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: AppSettings.GENERIC_CONFIRMATION_MESSAGE_DELETE,
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.service.delete(id).subscribe((data) => {
                this.getDataPage(this.pageIndex, this.pageSize);
          },(error) => {
            console.log(error.error.message);
          }
        );
      }
    });
  }

  nextPage(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getDataPage(this.pageIndex.toString(), this.pageSize.toString());
  }

  getDataPage(page, size) {
    this.service.getAllPages(page, size).subscribe(
      (data) => {
        this.manageResponsePages(data);
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }

  getDataPageWithText(page, size, text) {
    this.service.getAllPagesWithText(page, size, text).subscribe(
      (data) => {
        this.manageResponsePages(data);
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }

  manageResponsePages(data) {
    this.dataSource = new MatTableDataSource(data["content"]);
    this.dataList = data["content"];
    this.totalElements = data["totalElements"] as number;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.detectChanges();
  }
}
