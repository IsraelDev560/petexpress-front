import { z } from 'zod';

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Your name must be at least 3 characters long."),
  password: z
    .string()
    .min(6, "Your password must be at least 6 characters long."),
  role: z
    .string()
    .min(4)
    .max(5),
});

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, "Your name must be at least 3 characters long.")
    .nonempty("Username is required."),
  password: z
    .string()
    .min(6, "Password is required."),
});

export type RegisterForm = typeof registerSchema;
export type LoginForm = typeof loginSchema;