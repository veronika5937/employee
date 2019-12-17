import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartmentsRepository } from './departments.repository';
import { Department } from './department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(DepartmentsRepository)
    private departmentsRepository: DepartmentsRepository,
  ) {}

  async getDepartments(): Promise<Department[]> {
    return this.departmentsRepository.getDepartments();
  }

  async createDepartment(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    return this.departmentsRepository.createDepartment(createDepartmentDto);
  }

}
