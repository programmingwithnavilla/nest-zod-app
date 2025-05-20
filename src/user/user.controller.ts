import { Controller, Post, Body } from '@nestjs/common';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { CreateUserSchema, CreateUserDto } from './schemas/create-user.schema';

@Controller('user')
export class UserController {
  @Post()
  create(@Body(new ZodValidationPipe(CreateUserSchema)) body: CreateUserDto) {
    return {
      message: 'User created successfully!',
      user: body,
    };
  }
}
