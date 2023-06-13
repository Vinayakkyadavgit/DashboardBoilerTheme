import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormFields } from '../../models/form';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
})
export class FormDialogComponent implements OnInit {


  dynamicForm: FormGroup;
  headerTitle: string;
  fields : Array<FormFields>;

  constructor(
    private dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.headerTitle = "Employee Details";

    const controls = {};
    if (data) {
      this.fields = data;
      this.fields.forEach(res => {
        const validationsArray = [];
        res.validations.forEach(val => {
          if (val.name === 'required') {
            validationsArray.push(
              Validators.required
            );
          }
          if (val.name === 'pattern') {
            validationsArray.push(
              Validators.pattern(val.validator)
            );
          }
        });
        controls[res.label] = new FormControl('', validationsArray);
      });
      this.dynamicForm = new FormGroup(
        controls
      );
    }


  }

  ngOnInit() {

  }

  save() {
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }

}
