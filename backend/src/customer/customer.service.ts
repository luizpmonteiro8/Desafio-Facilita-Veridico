import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  private readonly pool: Pool;

  constructor(private readonly configService: ConfigService) {
    this.pool = new Pool({
      user: this.configService.get<string>('database.user'),
      host: this.configService.get<string>('database.host'),
      database: this.configService.get<string>('database.database'),
      password: this.configService.get<string>('database.password'),
      port: this.configService.get<number>('database.port'),
    });
  }

  async paginate(
    page: number,
    size: number,
    sort: string,
    order: string,
    search: string,
    field: string,
  ) {
    const tableName = 'customers';
    const offset = (page - 1) * size;
    const sortOrder = order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    let sortBy: string;
    switch (sort) {
      case 'name':
      case 'email':
      case 'phone':
      case 'street':
      case 'number':
      case 'complement':
      case 'district':
      case 'state':
      case 'city':
        sortBy = sort;
        break;
      case 'zipCode':
        sortBy = 'zip_code';
        break;
      default:
        sortBy = 'id';
    }

    const searchCondition = search ? `WHERE ${field} ILIKE '%${search}%'` : '';

    const query = `
      SELECT * FROM ${tableName}
      ${searchCondition}
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT ${size} OFFSET ${offset}
    `;

    try {
      const result = await this.pool.query(query);
      const totalResult = await this.pool.query(
        `SELECT COUNT(*) FROM ${tableName} ${searchCondition}`,
      );

      const totalCount = totalResult.rows[0].count;
      const lastPage = Math.ceil(totalCount / size);

      return {
        results: result.rows,
        pagination: {
          lastPage: lastPage,
          length: totalCount,
          page: page,
          size: size,
        },
      };
    } catch (error) {
      console.error('Error paginating customers:', error);
      throw new NotFoundException(`Um erro inesperado aconteceu.`);
    }
  }

  async findOne(id: number): Promise<any> {
    const query =
      'SELECT id, name,email, phone, zip_code AS "zipCode", street, ' +
      'number, complement, district, state, city FROM customers WHERE id = $1';

    try {
      const result = await this.pool.query(query, [id]);

      if (result.rowCount > 0) {
        return result.rows[0];
      } else {
        throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
      }
    } catch (error) {
      console.error(`Error fetching customer with ID ${id}:`, error);
      throw new NotFoundException(`Um erro inesperado aconteceu.`);
    }
  }

  async create(createCustomerDto: CreateCustomerDto) {
    const {
      name,
      email,
      phone,
      street,
      zipCode,
      number,
      complement,
      district,
      state,
      city,
    } = createCustomerDto;

    const query =
      'INSERT INTO customers (name, email, phone, street, zip_code, number, complement, district, state, city)' +
      'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';

    try {
      const result = await this.pool.query(query, [
        name,
        email,
        phone,
        street,
        zipCode,
        number,
        complement,
        district,
        state,
        city,
      ]);

      const createdCustomer = result.rows[0];

      return createdCustomer.id;
    } catch (error) {
      console.error('Error creating customer:', error);
      if (error.code === '23505') {
        throw new ConflictException('Já existe um cliente com este nome.');
      }

      throw new ConflictException('Ocorreu um erro ao criar o cliente');
    }
  }

  async update(
    id: number,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<string> {
    const {
      name,
      email,
      phone,
      street,
      zipCode,
      number,
      complement,
      district,
      state,
      city,
    } = updateCustomerDto;

    const query = `
      UPDATE customers
      SET
        name = $1,
        email = $2,
        phone = $3,
        street = $4,
        zip_code = $5,
        number = $6,
        complement = $7,
        district = $8,
        state = $9,
        city = $10
      WHERE id = $11
    `;

    try {
      const result = await this.pool.query(query, [
        name,
        email,
        phone,
        street,
        zipCode,
        number,
        complement,
        district,
        state,
        city,
        id,
      ]);

      if (result.rowCount > 0) {
        return id.toString();
      } else {
        return `Cliente com ID ${id} não encontrado.`;
      }
    } catch (error) {
      console.error(`Error updating customer with ID ${id}:`, error);

      if (error.code === '23505') {
        throw new ConflictException('Já existe um cliente com este nome.');
      }

      throw new ConflictException(
        `Um erro ocorreu ao remover o cliente com ID ${id}.`,
      );
    }
  }

  async remove(id: number): Promise<string> {
    const query = 'DELETE FROM customers WHERE id = $1';

    try {
      const result = await this.pool.query(query, [id]);

      if (result.rowCount > 0) {
        return id.toString();
      } else {
        return `Cliente com ID ${id} não encontrado.`;
      }
    } catch (error) {
      console.error(`Error removing customer with ID ${id}:`, error);
      throw new ConflictException(
        `Um erro ocorreu ao remover o cliente com ID ${id}.`,
      );
    }
  }
}
