import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { Employee } from '../employee.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActionTypeEnum } from 'src/app/shared';
import { EmployeeService } from '../employees.service';
import { EmployeesForm } from './employees-form.interface';

@Component({
  selector: 'app-employees-form',
  templateUrl: './employees-form.component.html',
  styleUrls: ['./employees-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesFormComponent implements OnInit {
  employeeForm: FormGroup;
  departments = [];
  editMode: boolean;
  employee: Partial<Employee>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: EmployeesForm,
              private dialogRef: MatDialogRef<EmployeesFormComponent>,
              private employeeService: EmployeeService,
              private fb: FormBuilder) {
    this.employee = this.data.employee;
    this.editMode = !!this.employee.id;
  }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      empName: [ this.employee.empName ],
      empActive: [ !!this.employee.empActive ],
      department: [ this.employee.department ]
    });
  }

  onSubmit(value: Employee) {
    const action = this.editMode ? ActionTypeEnum.EDIT : ActionTypeEnum.ADD;
    const res$ = this.editMode ?
      this.employeeService.editEmployee(value, this.employee.id) :
      this.employeeService.createEmployee(value);
    res$.subscribe(employee => this.dialogRef.close({action, employee}));
  }

}
