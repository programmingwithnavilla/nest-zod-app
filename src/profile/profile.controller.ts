import { Controller, Post, Body } from '@nestjs/common';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import {
  CreateProfileSchema,
  CreateProfileDto,
} from './schemas/profile.schema';

@Controller('profile')
export class ProfileController {
  @Post()
  create(
    @Body(new ZodValidationPipe(CreateProfileSchema)) body: CreateProfileDto,
  ) {
    return {
      message: 'Profile created successfully!',
      profile: body,
    };
  }
}
