import { Controller, Get, Post, Body, Param, Delete, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './employee.entity';
import { GetTasksFilterDto } from './dto/get-employees-filter.dto';

@Controller('employees')
@UseGuards(AuthGuard())
export class EmployeeController {

  constructor(private employeeService: EmployeeService) {}

  @Get()
  getEmployees(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<Employee[]> {
    return this.employeeService.getEmployees(filterDto);
  }

  @Get('/:id')
  getEmployeeById(@Param('id', ParseIntPipe) id: number): Promise<Employee> {
    return this.employeeService.getEmployeeById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createEmployee(@Body() createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    return this.employeeService.createEmployee(createEmployeeDto);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  editEmployee(@Param('id', ParseIntPipe) id: number, @Body() createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    return this.employeeService.editEmployee(id, createEmployeeDto);
  }

  @Delete('/:id')
  deleteEmployee(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.employeeService.deleteEmployee(id);
  }
}
