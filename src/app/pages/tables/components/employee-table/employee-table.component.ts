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
        label: "Name",
        inputType: "text",
        name: "name",
        validations: [
          {
            name: "required",
            validator: "required",
            message: "Name is Required"
          },
          {
            name: "pattern",
            validator: "^[a-zA-Z]+$",
            message: "Accept only text"
          }
        ]
      }, 
      {
        type: "input",
        label: "Company",
        inputType: "text",
        name: "company",
        validations: [
          {
            name: "required",
            validator: "required",
            message: "Company Name is Required"
          }
        ]
      },
      {
        type: "input",
        label: "State",
        inputType: "text",
        name: "state",
        validations: [
          {
            name: "required",
            validator: "required",
            message: "State Name is Required"
          }
        ]
      },
      {
        type: "input",
        label: "City",
        inputType: "text",
        name: "city",
        validations: [
          {
            name: "required",
            validator: "required",
            message: "City Name is Required"
          }
        ]
      }
    ];
    dialogConfig.data = fields;
    const dialogRef = this.dialog.open(FormDialogComponent, dialogConfig);
 
    dialogRef.afterClosed().subscribe((data) => {
    });
  }

  editForm(element): void {
    console.log(element)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'my-dialog';
    let fields: Array<FormFields> =   [
      {
        type: "input",
        label: "Name",
        inputType: "text",
        name: "name",
        value: element.name,
        validations: [
          {
            name: "required",
            validator: "required",
            message: "Name is Required"
          },
          {
            name: "pattern",
            validator: "^[a-zA-Z]+$",
            message: "Accept only text"
          }
        ]
      }, 
      {
        type: "input",
        label: "Company",
        inputType: "text",
        name: "company",
        value: element.company,
        validations: [
          {
            name: "required",
            validator: "required",
            message: "Company Name is Required"
          }
        ]
      },
      {
        type: "input",
        label: "State",
        inputType: "text",
        name: "state",
        value: element.state,
        validations: [
          {
            name: "required",
            validator: "required",
            message: "State Name is Required"
          }
        ]
      },
      {
        type: "input",
        label: "City",
        inputType: "text",
        name: "city",
        value: element.city,
        validations: [
          {
            name: "required",
            validator: "required",
            message: "City Name is Required"
          }
        ]
      }
    ];
    dialogConfig.data = fields
    const dialogRef = this.dialog.open(FormDialogComponent, dialogConfig);
 
    dialogRef.afterClosed().subscribe((data) => {
    });
  }
}
