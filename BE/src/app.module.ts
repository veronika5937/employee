import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { EmployeeModule } from './employee/employee.module';
import { DepartmentsModule } from './departments/departmnets.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    EmployeeModule,
    AuthModule,
    DepartmentsModule,
  ],
})
export class AppModule {}
