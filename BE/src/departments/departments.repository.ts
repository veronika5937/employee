import { EntityRepository, Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { Department } from './department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';

@EntityRepository(Department)
export class DepartmentsRepository extends Repository<Department> {

  async getDepartments(): Promise<Department[]> {
    try {
      return await Department.find();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createDepartment(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    const { dpName } = createDepartmentDto;

    const department = new Department();
    department.dpName = dpName;
    try {
      await department.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return department;
  }
}
