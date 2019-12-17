import { Employee } from '../employee.interface';
import { Department } from '../../shared';

export interface EmployeesForm {
  employee: Partial<Employee>;
  departments: Department[];
}
