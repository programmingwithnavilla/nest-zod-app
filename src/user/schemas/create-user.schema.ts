import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  age: z.number().int().min(1),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
