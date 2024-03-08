import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class Address {
  @IsString({ message: 'A rua deve ser um texto.' })
  @IsNotEmpty({ message: 'A rua não pode estar vazia.' })
  street: string;

  @IsString({ message: 'O número deve ser um texto.' })
  @IsNotEmpty({ message: 'O número não pode estar vazio.' })
  number: string;

  @IsString({ message: 'O complemento deve ser um texto.' })
  @IsOptional()
  complement?: string;

  @IsString({ message: 'O bairro deve ser um texto.' })
  @IsNotEmpty({ message: 'O bairro não pode estar vazio.' })
  district: string;

  @IsString({ message: 'O estado deve ser um texto.' })
  @IsNotEmpty({ message: 'O estado não pode estar vazio.' })
  state: string;

  @IsString({ message: 'A cidade deve ser um texto.' })
  @IsNotEmpty({ message: 'A cidade não pode estar vazia.' })
  city: string;
}

export class RoutesDto {
  @ValidateNested({ message: 'A origem deve ser um endereço válido.' })
  @Type(() => Address)
  origin: Address;
}
