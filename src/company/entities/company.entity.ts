import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Employee } from '../../employee/entities/employee.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  website!: string;

  @Column({ type: 'int', default: 0 })
  totalEmployees!: number;

  @OneToMany(() => Employee, (employee) => employee.company)
  employees!: Employee[];
}
