import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit   {
  
    public breakpoint: number; // Breakpoint observer code
    public fname: string = `Ramesh`;
    public lname: string = `Suresh`;
    public addStudentForm: FormGroup;
    wasFormChanged = false;

    constructor(
      private fb: FormBuilder,
      public dialog: MatDialog
    ) { }

    public ngOnInit(): void {
      this.addStudentForm = this.fb.group({
        IdProof: null,
        firstname: [this.fname, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
        lastname: [this.lname, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
        email: [null, [Validators.required, Validators.email]],
      });
      this.breakpoint = window.innerWidth <= 600 ? 1 : 2; // Breakpoint observer code
    }

    public onAddCus(): void {
      this.markAsDirty(this.addStudentForm);
    }

    openDialog(): void {

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

}