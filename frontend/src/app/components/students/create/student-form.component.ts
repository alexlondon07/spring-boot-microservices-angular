import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {

  public breakpoint: number; // Breakpoint observer code
  public addStudentForm: FormGroup;
  wasFormChanged = false;

  constructor(
    private _studentService: StudentService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  public ngOnInit(): void {
    this.addStudentForm = this.fb.group({
      id: null,
      firstname: [null, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
      lastname: [null, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
      email: [null, [Validators.required, Validators.email]],
    });
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2; // Breakpoint observer code
  }

  public onAddCus(): void {
    this.markAsDirty(this.addStudentForm);
  }

  openDialog(): void {
    console.log(this.wasFormChanged);

    this.closeDialog();
  }
  
  closeDialog(){
    this.dialog.closeAll();
  }

  // tslint:disable-next-line:no-any
  public onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
  }

  private markAsDirty(group: FormGroup): void {
    group.markAsDirty();
    // tslint:disable-next-line:forin
    for (const i in group.controls) {
      group.controls[i].markAsDirty();
    }
  }

  formChanged() {
    this.wasFormChanged = true;
  }

  onSubmit() {

    if(!this.addStudentForm.valid){
      return;
    }

    this._studentService.createStudent(this.addStudentForm.value).subscribe(res => {
      this.addStudentForm.reset();
      this.openSnackBar('Information saved successfully', 'OK');
      this.closeDialog();
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}