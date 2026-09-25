import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from '../company/entities/company.entity';
import { Employee } from './entities/employee.entity';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Company])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
