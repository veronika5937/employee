import { Employee } from './employee.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { GetTasksFilterDto } from './dto/get-employees-filter.dto';

@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee> {

  async getEmployees(filterDto: GetTasksFilterDto): Promise<any> {
    const { empName, page } = filterDto;
    const query = this.createQueryBuilder('employee');

    if (empName) {
      query.where('employee.empName LIKE :search', { search: `%${empName}%` });
    }

    query.skip(10 * page);
    query.take(10);

    try {
      const employees = await query.getManyAndCount();
      const [ data, totalCount ] = employees;
      return { data, totalCount };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const { empName, empActive, department } = createEmployeeDto;

    const employee = new Employee();
    employee.empName = empName;
    employee.empActive = empActive;
    employee.department = department;
    try {
      await employee.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return employee;
  }
}
