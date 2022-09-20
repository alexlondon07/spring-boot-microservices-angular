import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppSettings } from 'src/app/config/app';
import { Exam } from 'src/app/models/Exam';
import { Subject } from 'src/app/models/Subject';
import { ExamService } from 'src/app/services/exam.service';

export interface Food {
  value: string;
  viewValue: string;
}
interface Animal {
  name: string;
  sound: string;
}

@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.css']
})
export class ExamFormComponent implements OnInit {

  titleButton = 'Save';
  title = 'Add Exam';
  public breakpoint: number; // Breakpoint observer code
  public form: FormGroup;
  wasFormChanged = false;
  exam: Exam = new Exam();
  dataListSubjects: Subject[] = [];
  selectedFood: string;
  selectedFoodModel: string;
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  animalControl = new FormControl<Animal | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  animals: Animal[] = [
    {name: 'Dog', sound: 'Woof!'},
    {name: 'Cat', sound: 'Meow!'},
    {name: 'Cow', sound: 'Moo!'},
    {name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!'},
  ];
  display: FormControl = new FormControl("", Validators.required);
  file_store: FileList;
  file_list: Array<string> = [];

  constructor(
    private _service: ExamService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ExamFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.exam = data.data;
    this.dataListSubjects = data.subjects;
  }

  public ngOnInit(): void {
    this.createFormBuilder();
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2; // Breakpoint observer code
  }

  createFormBuilder() {
    if (this.exam?.id > 0) {
      this.titleButton = 'Edit';
      this.title = 'Edit Exam';
    }

    this.form = this.fb.group({
      id: this.exam?.id,
      name: [this.exam?.name, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]],
    });

    this.onCreateGroupFormValueChange();
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

  public onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
  }

  private markAsDirty(group: FormGroup): void {
    group.markAsDirty();
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