import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString({ message: 'O nome deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  name: string;

  @IsEmail({}, { message: 'O e-mail deve ser válido.' })
  @IsNotEmpty({ message: 'O e-mail não pode estar vazio.' })
  email: string;

  @IsString({ message: 'O telefone deve ser um texto.' })
  @IsNotEmpty({ message: 'O telefone não pode estar vazio.' })
  phone: string;

  @IsString({ message: 'O CEP deve ser um texto.' })
  @IsNotEmpty({ message: 'O CEP não pode estar vazio.' })
  zipCode: string;

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
