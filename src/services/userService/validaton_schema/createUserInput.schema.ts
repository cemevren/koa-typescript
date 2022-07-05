import { z } from 'zod';

export const createUserInputSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .regex(
      new RegExp(
        '(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}',
      ),
    ),
  first_name: z.string(),
  last_name: z.string(),
});
