import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { TablesService } from '../../services';
import { Employee } from '../../models';

@Component({
  selector: 'app-tables-page',
  templateUrl: './tables-page.component.html',
  styleUrls: ['./tables-page.component.scss']
})
export class TablesPageComponent {
  public employeeTableData$: Observable<Employee[]>

  constructor(private service: TablesService) {
    this.employeeTableData$ = service.loadEmployeeTableData();
  }
}
