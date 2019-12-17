import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { Employee } from './employee.interface';
import { EmployeesFormComponent } from './employees-form';
import { take } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { EmployeeService } from './employees.service';
import { ActionTypeEnum, Department } from '../shared';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesComponent implements OnInit {
  employees: Employee[];
  departments: Department[];
  departmentNames: {[key: number]: string};

  displayedColumns: string[] = ['id', 'empName', 'empActive', 'department', 'controls'];
  dataSource: MatTableDataSource<Employee>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private dialog: MatDialog, private cd: ChangeDetectorRef, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.getDepartments().subscribe(dep => {
      this.departments = dep;
      this.departmentNames = this.departments.reduce((acc, currentVal) => {
        acc[currentVal.id] = currentVal.dpName;
        return acc;
      }, {});
    });

    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
      this.setTableData(employees);
    });
  }

  openForm(employee: Partial<Employee> = {}) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {departments: this.departments, employee};

    const dialogRef = this.dialog.open(EmployeesFormComponent, dialogConfig);

    dialogRef.afterClosed()
      .pipe(take(1))
      .subscribe(data => data && this.handleEmployees(data.action, data.employee));
  }

  setTableData(employees: Employee[]) {
    this.dataSource = new MatTableDataSource<Employee>(employees);
    this.dataSource.paginator = this.paginator;
    this.cd.markForCheck();
  }

  filter(value: string) {
    const filterVal = value.trim();
    const filteredData = filterVal ? this.employeeService.handleFilter(filterVal, this.employees) : this.employees;
    this.setTableData(filteredData);
  }

  delete(employee: Employee) {
    this.employeeService.deleteEmployee(employee.id)
      .subscribe(() => this.handleEmployees(ActionTypeEnum.REMOVE, employee));
  }

  private handleEmployees(action: ActionTypeEnum, employee: Employee) {
    this.employees = this.employeeService.handleData(employee, this.employees, action);
    this.setTableData(this.employees);
  }

}
