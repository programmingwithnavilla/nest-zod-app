import { z } from 'zod';
// Simulate relationship to another entity (like Role)
const RoleSchema = z.object({
  id: z.string().uuid(),
  name: z.enum(['ADMIN', 'USER', 'MANAGER']),
});
// Embedded object (e.g., address)
const AddressSchema = z.object({
  street: z.string().min(3),
  city: z.string().min(2),
  postalCode: z.string().regex(/^\d{5}$/, 'Postal code must be 5 digits'),
  country: z.string().min(2),
});

export const CreateUserSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),

  password: z.string().min(6),

  // Optional nested object (address)
  address: AddressSchema.optional(),

  // Optional array of roles
  roles: z.array(RoleSchema).min(1).optional(),

  // Simple boolean with default
  isActive: z.boolean().default(true),

  // Birthdate with custom validation
  birthDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  }),

  // Arbitrary key-value object
  preferences: z.record(z.string(), z.any()).optional(),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
