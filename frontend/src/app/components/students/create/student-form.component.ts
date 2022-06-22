import { Component, Inject, OnInit, Optional, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Student } from 'src/app/models/Student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {

    titleButton = 'Save';
    public breakpoint: number; // Breakpoint observer code
    public addStudentForm: FormGroup;
    wasFormChanged = false;
    student: Student = new Student();

    constructor(
      private _studentService: StudentService,
      private fb: FormBuilder,
      private _snackBar: MatSnackBar,
      public dialogRef: MatDialogRef<StudentFormComponent>,
      @Optional() @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.student = data;
    }

    public ngOnInit(): void {
      this.createFormBuilder();
      this.breakpoint = window.innerWidth <= 600 ? 1 : 2; // Breakpoint observer code
    }

    createFormBuilder() {

      this.titleButton = this.student?.id > 0 ? 'Editar' :  this.titleButton;

      this.addStudentForm = this.fb.group({
        id: this.student?.id,
        name: [this.student?.name, [
          Validators.required,
          Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*'),
          Validators.minLength(3),
          Validators.maxLength(90),
        ]],
        lastName: [this.student?.lastName, [
          Validators.required,
          Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*'),
          Validators.minLength(5),
          Validators.maxLength(90)
        ]],
        email: [this.student?.email, [
          Validators.required,
          Validators.email,
          Validators.minLength(5),
          Validators.maxLength(90)
        ]],
      });
      
      this.onCreateGroupFormValueChange();
        console.log("TCL: StudentFormComponent -> createFormBuilder -> this.addStudentForm", this.addStudentForm)
      
    }

    public onAddCus(): void {
      this.markAsDirty(this.addStudentForm);
    }

    openDialog(): void {
      this.closeDialog(null);
    }

    closeDialog(res: any, method = 'create') {
      this.dialogRef.close({ event: 'close', data: res, method });
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
      this.validateForm();

      this._studentService.create(this.addStudentForm.value).subscribe(res => {
        this.addStudentForm.reset();
        this.openSnackBar('Information saved successfully', 'OK');
        this.closeDialog(res);
      });
    }

    validateForm(): void {
      if (!this.addStudentForm.valid) {
        return;
      }

      if (this.addStudentForm.controls.id.value > 0 ){
        this.editStudent();
      }else{
        this.createStudent();
      }
    }

    createStudent(){
      this._studentService.create(this.addStudentForm.value).subscribe(res => {
        this.checkResponse('Information saved successfully', 'create', res);
      });
    }

    editStudent(){
      this._studentService.update(this.addStudentForm.value).subscribe(res => {
        this.checkResponse('Information updated successfully', 'edit', res);
      });
    }

    checkResponse(message: string, method: string, response: any){
      this.addStudentForm.reset();
      this.openSnackBar(message, 'OK');
      this.closeDialog(response, method);
    }

    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action);
    }

    onCreateGroupFormValueChange(){
      this.addStudentForm.valueChanges.subscribe(value => {
        console.log(value);
      });
  }

}