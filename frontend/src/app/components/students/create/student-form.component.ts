import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<StudentFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  public ngOnInit(): void {
    this.addStudentForm = this.fb.group({
      id: null,
      name: [null, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
      lastName: [null, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
      email: [null, [Validators.required, Validators.email]],
    });
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2; // Breakpoint observer code
  }

  public onAddCus(): void {
    this.markAsDirty(this.addStudentForm);
  }

  openDialog(): void {
    this.closeDialog(null);
  }


  closeDialog(res: any) {
    this.dialogRef.close({ event: 'close', data: res });
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

    if (!this.addStudentForm.valid) {
      return;
    }

    this._studentService.createStudent(this.addStudentForm.value).subscribe(res => {
      this.addStudentForm.reset();
      this.openSnackBar('Information saved successfully', 'OK');
      this.closeDialog(res);
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}