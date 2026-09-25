import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  create(data: CreateCompanyDto) {
    return this.companyRepository.save(this.companyRepository.create(data));
  }

  findAll() {
    return this.companyRepository.find({ relations: { employees: true } });
  }

  async findOne(id: number) {
    const company = await this.companyRepository.findOne({
      where: { id },
      relations: { employees: true },
    });
    if (!company) {
      throw new NotFoundException(`Company ${id} not found`);
    }
    return company;
  }

  async update(id: number, data: UpdateCompanyDto) {
    const result = await this.companyRepository.update(id, data);
    if (!result.affected) {
      throw new NotFoundException(`Company ${id} not found`);
    }
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.companyRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`Company ${id} not found`);
    }
    return { message: 'Company deleted' };
  }
}
