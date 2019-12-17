import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentsRepository } from './departments.repository';
import { AuthModule } from '../auth/auth.module';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([DepartmentsRepository]),
        AuthModule,
    ],
    controllers: [DepartmentsController],
    providers: [DepartmentsService],
})
export class DepartmentsModule { }
