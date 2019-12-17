import { Employee } from './employee.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { User } from '../auth/user.entity';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee> {

  async getEmployees(): Promise<Employee[]> {
    try {
      return await Employee.find();
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
