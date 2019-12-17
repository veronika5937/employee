import { IsOptional, IsNotEmpty } from 'class-validator';

export class GetTasksFilterDto {
  @IsNotEmpty()
  page: number;

  @IsOptional()
  empName: string;
}
