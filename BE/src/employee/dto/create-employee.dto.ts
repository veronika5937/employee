import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  empName: string;

  @IsNotEmpty()
  empActive: boolean;

  @IsNotEmpty()
  department: number;
}
