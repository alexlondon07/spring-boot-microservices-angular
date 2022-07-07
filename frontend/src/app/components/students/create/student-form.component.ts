import { Component, Inject, OnInit, Optional, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppSettings } from 'src/app/config/app';
import { Student } from 'src/app/models/Student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {

    titleButton = 'Save';
    title = 'Add Student';
    public breakpoint: number; // Breakpoint observer code
    public addStudentForm: FormGroup;
    wasFormChanged = false;
    student: Student = new Student();

    display: FormControl = new FormControl("", Validators.required);
    file_store: FileList;
    file_list: Array<string> = [];
  
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
      if(this.student?.id > 0){
        this.titleButton =  'Edit';
        this.title = 'Edit Student';
      }

      this.addStudentForm = this.fb.group({
        id: this.student?.id,
        image: [this.student?.image, [Validators.required]],
        name: [this.student?.name, [
          Validators.required,
          Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*'),
          Validators.minLength(3),
          Validators.maxLength(90),
        ]],
        lastName: [this.student?.lastName, [
          Validators.required,
          Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*'),
          Validators.minLength(3),
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
    }

    handleFileInputChange(l: FileList): void {
      this.file_store = l;
      this.file_list = [];
      if (l.length) {
        const f = l[0];
        const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
        this.display.patchValue(`${f.name}${count}`);
        this.addStudentForm.controls['image'].patchValue(this.file_store[0]);
      } else {
        this.display.patchValue("");
      }
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
      this._studentService.createWithImage(this.addStudentForm.value, this.addStudentForm.controls.image.value).subscribe(res => {
        this.checkResponse(AppSettings.GENERIC_MESSAGE_CREATED, 'create', res);
      });
    }

    editStudent(){
      this._studentService.editWithImage(this.addStudentForm.value, this.addStudentForm.controls.image.value).subscribe(res => {
        this.checkResponse(AppSettings.GENERIC_MESSAGE_UPDATED, 'edit', res);
      });
    }

    checkResponse(message: string, method: string, response: any){
      this.addStudentForm.reset();
      this.openSnackBar(message, 'OK');
      this.closeDialog(response, method);
    }

    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {
        duration: 3000
      });
    }

    onCreateGroupFormValueChange(){
      this.addStudentForm.valueChanges.subscribe(value => {
        console.log(value);
      });
  }

}