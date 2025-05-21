import { z } from 'zod';

const SocialLinkSchema = z.object({
  platform: z.enum(['TWITTER', 'LINKEDIN', 'GITHUB', 'WEBSITE']),
  url: z.string().url(),
});

const ContactInfoSchema = z.object({
  phone: z
    .string()
    .regex(/^\+\d{1,3}\s\d{4,14}$/, 'Invalid international phone number'),
  alternateEmail: z.string().email().optional(),
});

export const CreateProfileSchema = z.object({
  userId: z.string().uuid(),

  fullName: z.string().min(2).max(100),
  bio: z.string().max(500).optional(),
  age: z.number().int().min(13).max(120),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']).optional(),

  socialLinks: z.array(SocialLinkSchema).optional(),
  contactInfo: ContactInfoSchema.optional(),

  avatarUrl: z.string().url().optional().or(z.literal('')),
  interests: z
    .tuple([z.string(), z.string()])
    .optional()
    .refine(([a, b]: any) => a !== b, {
      message: 'Interests must be different',
    }),

  metadata: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
  updatedAt: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid ISO date',
    })
    .default(new Date().toISOString()),
});

export type CreateProfileDto = z.infer<typeof CreateProfileSchema>;
