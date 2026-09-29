import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString, Min, Matches } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({ example: '2000000000000' })
  @IsString()
  idnp!: string;

  @ApiProperty({ example: 'Ion Popescu' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 15000 })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  salary!: number;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  companyId!: number;

  @ApiProperty({ example: '+37360000000' })
  @IsString()
  @Matches(/^\+?\d{7,15}$/, { message: 'phone must be a valid phone number' })
  phone!: string;

  
}
