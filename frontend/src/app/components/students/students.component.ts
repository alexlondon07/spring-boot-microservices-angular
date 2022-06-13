import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';


import { StudentService } from '../../services/student.service';
import { Student } from '../../models/Student';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class StudentsComponent implements OnInit {

  title = 'Students list';
  public students: Student[] = [];
  displayedColumns: string[] = ['id', 'name', 'lastName', 'email', 'createdAt'];
  dataSource = new MatTableDataSource();
  constructor(private service: StudentService) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.service.getAllStudents().subscribe(data =>{
      this.dataSource.data = data;
      console.log("TCL: StudentsComponent -> getData -> this.dataSource", this.dataSource)
    });
  }
}
