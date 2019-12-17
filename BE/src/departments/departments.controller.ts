import { Controller, UseGuards, Get, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Department } from './department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { DepartmentsService } from './departments.service';

@Controller('departments')
@UseGuards(AuthGuard())
export class DepartmentsController {

  constructor(private departmentsService: DepartmentsService) {}

  @Get()
  getDepartments(): Promise<Department[]> {
    return this.departmentsService.getDepartments();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createDepartment(@Body() createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    return this.departmentsService.createDepartment(createDepartmentDto);
  }
}
