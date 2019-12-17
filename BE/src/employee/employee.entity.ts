import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../auth/user.entity';
import { Department } from '../departments/department.entity';

@Entity()
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  empName: string;

  @Column()
  empActive: boolean;

  @Column()
  department: number;
}
