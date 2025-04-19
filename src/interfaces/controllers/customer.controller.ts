import { Body, Controller, Post, HttpCode, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { CreateCustomerCommand } from '../../application/commands/create-customer.command';
import { CreateCustomerDto } from '../dto/create-customer.dto';

@ApiTags('customers')
@Controller('customers')
export class CustomerController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiResponse({ status: 201, description: 'Customer created successfully.' })
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    // This DTO has been validated and transformed by the ValidationPipe.
    return await this.commandBus.execute(
      new CreateCustomerCommand(
        createCustomerDto.firstName,
        createCustomerDto.lastName,
        new Date(createCustomerDto.dateOfBirth),
        createCustomerDto.phoneNumber,
        createCustomerDto.email,
        createCustomerDto.bankAccountNumber,
      ),
    );
  }
}