import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Employee } from '../../models/employee';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import { FormFields } from '../../models/form';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss']
})
export class EmployeeTableComponent implements OnInit {
  @Input() employeeTableData: Employee[];
  public displayedColumns: string[] = ['name', 'company', 'city', 'state','operations'];
  public dataSource: MatTableDataSource<Employee>;
  public selection = new SelectionModel<Employee>(true, []);

  public isShowFilterInput = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public dialog: MatDialog){
  };
  

  public ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Employee>(this.employeeTableData);

    this.dataSource.paginator = this.paginator;
  }


  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public showFilterInput(): void {
    this.isShowFilterInput = !this.isShowFilterInput;
    this.dataSource = new MatTableDataSource<Employee>(this.employeeTableData);
  }

  openForm(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'my-dialog';
    let fields: Array<FormFields> =   [
      {
        type: "input",
        label: "Username",
        inputType: "text",
        name: "name",
        validations: [
          {
            name: "required",
            validator: "required",
            message: "Name Required"
          },
          {
            name: "pattern",
            validator: "^[a-zA-Z]+$",
            message: "Accept only text"
          }
        ]
      }, 
      {
        type: "password",
        label: "Password",
        inputType: "text",
        name: "name",
        validations: [
          {
            name: "required",
            validator: "required",
            message: "Password Required"
          }
        ]
      }
    ];
    dialogConfig.data = fields;
    const dialogRef = this.dialog.open(FormDialogComponent, dialogConfig);
 
    dialogRef.afterClosed().subscribe((data) => {
    console.log('hello');
    });
  }

  editForm(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'my-dialog';
    dialogConfig.data = {
       
     };
 
    const dialogRef = this.dialog.open(FormDialogComponent, dialogConfig);
 
    dialogRef.afterClosed().subscribe((data) => {
    console.log('hello');
    });
  }
}
