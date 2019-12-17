import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeRepository } from './employee.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeRepository)
    private employeeRepository: EmployeeRepository,
  ) {}

  async getEmployees(): Promise<Employee[]> {
    return this.employeeRepository.getEmployees();
  }

  async getEmployeeById(id: number): Promise<Employee> {
    const found = await this.employeeRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Employee with ID "${id}" not found`);
    }

    return found;
  }

  async createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    return this.employeeRepository.createEmployee(createEmployeeDto);
  }

  async editEmployee(id: number, body: CreateEmployeeDto): Promise<Employee> {
    const eployeeToUpdate = await this.employeeRepository.findOne(id);
    const employee = Object.assign(eployeeToUpdate, body);
    await this.employeeRepository.save(employee);
    return employee;
  }

  async deleteEmployee(id: number): Promise<void> {
    const result = await this.employeeRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Employee with ID "${id}" not found`);
    }
  }
}
