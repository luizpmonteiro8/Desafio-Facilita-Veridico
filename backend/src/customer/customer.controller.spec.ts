import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

describe('CustomerController', () => {
  let controller: CustomerController;
  let service: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [CustomerService],
    }).compile();

    controller = module.get<CustomerController>(CustomerController);
    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a customer by ID', async () => {
      const customerMock = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(customerMock);

      const result = await controller.findOne('1');

      expect(result).toEqual(customerMock);
    });

    it('should return null if customer not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      const result = await controller.findOne('999');

      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a new customer', async () => {
      const createCustomerDto: CreateCustomerDto = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123456789',
        street: '123 Main St',
        zipCode: '12345',
        number: '1',
        complement: 'Apt 123',
        district: 'Downtown',
        state: 'CA',
        city: 'Cityville',
      };
      jest
        .spyOn(service, 'create')
        .mockResolvedValue('Customer created successfully.');

      const result = await controller.create(createCustomerDto);

      expect(result).toEqual('Customer created successfully.');
    });
  });
});
