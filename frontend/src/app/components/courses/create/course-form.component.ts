import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppSettings } from 'src/app/config/app';
import { Course } from 'src/app/models/Course';
import { CourseService } from 'src/app/services/course.service';


@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {

  titleButton = 'Save';
  title = 'Add Course';
  public breakpoint: number; // Breakpoint observer code
  public form: FormGroup;
  wasFormChanged = false;
  course: Course = new Course();

  display: FormControl = new FormControl("", Validators.required);
  file_store: FileList;
  file_list: Array<string> = [];

  constructor(
    private _service: CourseService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CourseFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.course = data;
  }

  public ngOnInit(): void {
    this.createFormBuilder();
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2; // Breakpoint observer code
  }

  createFormBuilder() {
    if (this.course?.id > 0) {
      this.titleButton = 'Edit';
      this.title = 'Edit Student';
    }

    this.form = this.fb.group({
      id: this.course?.id,
      name: [this.course?.name, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]],
      description: [this.course?.description, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(250)
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
      this.form.controls['image'].patchValue(this.file_store[0]);
    } else {
      this.display.patchValue("");
    }
  }


  public onAddCus(): void {
    this.markAsDirty(this.form);
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
    if (!this.form.valid) {
      return;
    }

    if (this.form.controls.id.value > 0) {
      this.edit();
    } else {
      this.create();
    }
  }

  create() {
    this._service.create(this.form.value).subscribe(res => {
      this.checkResponse(AppSettings.GENERIC_MESSAGE_CREATED, 'create', res);
    });
  }

  edit() {
    this._service.update(this.form.value).subscribe(res => {
      this.checkResponse(AppSettings.GENERIC_MESSAGE_UPDATED, 'edit', res);
    });
  }

  checkResponse(message: string, method: string, response: any) {
    this.form.reset();
    this.openSnackBar(message, 'OK');
    this.closeDialog(response, method);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }

  onCreateGroupFormValueChange() {
    this.form.valueChanges.subscribe(value => {
      // console.log(value);
    });
  }

}