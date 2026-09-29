import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../company/entities/company.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(data: CreateEmployeeDto) {
    await this.ensureCompany(data.companyId);
    const employee = await this.employeeRepository.save(
      this.employeeRepository.create(data),
    );
    await this.companyRepository.increment({ id: data.companyId }, 'totalEmployees', 1);
    return this.findOne(employee.id);
  }

  findAll() {
    return this.employeeRepository.find({ relations: { company: true } });
  }

  async findOne(id: number) {
    const employee = await this.employeeRepository.findOne({
      where: { id },
      relations: { company: true },
    });
    if (!employee) {
      throw new NotFoundException(`Employee ${id} not found`);
    }
    return employee;
  }

  async update(id: number, data: UpdateEmployeeDto) {
    const current = await this.findOne(id);
    if (data.companyId !== undefined && data.companyId !== current.companyId) {
      await this.ensureCompany(data.companyId);
    }
    await this.employeeRepository.update(id, data);
    if (data.companyId !== undefined && data.companyId !== current.companyId) {
      await this.companyRepository.decrement({ id: current.companyId }, 'totalEmployees', 1);
      await this.companyRepository.increment({ id: data.companyId }, 'totalEmployees', 1);
    }
    return this.findOne(id);
  }

  async remove(id: number) {
    const employee = await this.findOne(id);
    await this.employeeRepository.delete(id);
    await this.companyRepository.decrement(
      { id: employee.companyId },
      'totalEmployees',
      1,
    );
    return { message: 'Employee deleted' };
  }

  private async ensureCompany(companyId: number) {
    const exists = await this.companyRepository.existsBy({ id: companyId });
    if (!exists) {
      throw new NotFoundException(`Company ${companyId} not found`);
    }
  }
}
