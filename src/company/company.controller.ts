import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@ApiTags('companies')
@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiOperation({ summary: 'Create a company' })
  @ApiBody({ type: CreateCompanyDto })
  @ApiCreatedResponse({ description: 'Company created' })
  create(@Body() data: CreateCompanyDto) {
    return this.companyService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'List companies' })
  @ApiOkResponse({ description: 'List of companies and their employees' })
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a company by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ description: 'Company found' })
  @ApiNotFoundResponse({ description: 'Company not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.companyService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a company' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateCompanyDto })
  @ApiOkResponse({ description: 'Company updated' })
  @ApiNotFoundResponse({ description: 'Company not found' })
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateCompanyDto) {
    return this.companyService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a company and its employees' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ description: 'Company deleted' })
  @ApiNotFoundResponse({ description: 'Company not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.companyService.remove(id);
  }
}
