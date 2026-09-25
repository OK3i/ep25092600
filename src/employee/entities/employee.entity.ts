import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  ValueTransformer,
} from 'typeorm';
import { Company } from '../../company/entities/company.entity';

const decimalNumberTransformer: ValueTransformer = {
  to: (value: number) => value,
  from: (value: string | number) => Number(value),
};

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  idnp!: string;

  @Column()
  name!: string;

  @Column('decimal', { precision: 12, scale: 2, transformer: decimalNumberTransformer })
  salary!: number;

  @Column()
  companyId!: number;

  @ManyToOne(() => Company, (company) => company.employees, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'companyId' })
  company!: Company;
}
