import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  @Type(() => Number)
  @IsNumber()
  id: number;
}
