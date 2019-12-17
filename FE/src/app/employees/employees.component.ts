import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { Employee, EmployeeRes } from './employee.interface';
import { EmployeesFormComponent } from './employees-form';
import { take, switchMap, share } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { EmployeeService } from './employees.service';
import { Department } from '../shared';
import { merge, BehaviorSubject, Observable } from 'rxjs';
import { EmployeesFilterComponent } from './employees-filter';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesComponent implements OnInit {
  employees$: Observable<EmployeeRes>;
  departments: Department[];
  departmentNames: {[key: number]: string};

  displayedColumns: string[] = ['id', 'empName', 'empActive', 'department', 'controls'];
  update$ = new BehaviorSubject(Symbol());

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(EmployeesFilterComponent, {static: true}) filterInput: EmployeesFilterComponent;

  constructor(private dialog: MatDialog, private employeeService: EmployeeService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.employeeService.getDepartments()
      .subscribe(departments => this.handleDepartments(departments));

    this.filterInput.filterChange$.subscribe(() => this.paginator.pageIndex = 0);

    this.employees$ = merge(this.update$, this.paginator.page, this.filterInput.filterChange$).pipe(
      switchMap(() => this.employeeService.getEmployees(this.paginator.pageIndex, this.filterInput.value)),
      share()
    );
  }

  openForm(employee: Partial<Employee> = {}) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {departments: this.departments, employee};

    const dialogRef = this.dialog.open(EmployeesFormComponent, dialogConfig);

    dialogRef.afterClosed()
      .pipe(take(1))
      .subscribe(data => data && this.handleEmployees());
  }


  delete(employee: Employee) {
    this.employeeService.deleteEmployee(employee.id)
      .subscribe(() => this.handleEmployees());
  }

  private handleEmployees() {
    this.toastrService.success('Employees has been successfully changed');
    this.update$.next(Symbol());
  }

  private handleDepartments(dep: Department[]) {
    this.departments = dep;
    this.departmentNames = this.departments.reduce((acc, currentVal) => {
      acc[currentVal.id] = currentVal.dpName;
      return acc;
    }, {});
  }


}
