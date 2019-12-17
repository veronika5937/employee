import { Injectable } from '@angular/core';
import { Employee } from './employee.interface';
import { ActionTypeEnum, Department } from '../shared';
import { BehaviorSubject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class EmployeeService {
  constructor(private httpClient: HttpClient) { }

  getEmployees() {
    return this.httpClient.get<Employee[]>(`${environment.apiUrl}/employees`);
  }

  createEmployee(employee: Employee) {
    return this.httpClient.post<Employee>(`${environment.apiUrl}/employees`, employee);
  }

  deleteEmployee(id: number) {
    return this.httpClient.delete<Employee>(`${environment.apiUrl}/employees/${id}`);
  }

  editEmployee(employee: Employee, id: number) {
    return this.httpClient.put<Employee>(`${environment.apiUrl}/employees/${id}`, employee);
  }

  getDepartments() {
    return this.httpClient.get<Department[]>(`${environment.apiUrl}/departments`);
  }

  handleFilter(filterVal: string, employees: Employee[]) {
    const pattern = new RegExp('^' + filterVal, 'i');
    return employees.filter(({empName}) => empName.match(pattern));
  }

  handleData(employee: Employee, employees: Employee[], action: ActionTypeEnum) {
    switch (action) {
      case ActionTypeEnum.EDIT: {
        return employees.map(emp => emp.id === employee.id ? employee : emp);
      }
      case ActionTypeEnum.REMOVE: {
        return employees.filter(emp => emp.id !== employee.id);
      }
      case ActionTypeEnum.ADD: {
        return [...employees, employee];
      }
    }
  }

}
