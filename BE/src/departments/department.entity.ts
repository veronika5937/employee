import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../auth/user.entity';

@Entity()
export class Department extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dpName: string;
}
