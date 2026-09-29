import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsUrl, Min } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({ example: 'Acme' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 'https://acme.example' })
  @IsString()
  @IsUrl({ require_protocol: true })
  website!: string;

  @ApiProperty({ example: 0, default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  totalEmployees?: number;
}
