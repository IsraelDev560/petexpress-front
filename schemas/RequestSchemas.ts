import { z } from 'zod';

export const TaskSchema = z.object({
  taskTypeName: z.string(),
  animalId: z.string(),
  description: z.string(),
  date: z.string()
});

export const TaskTypeSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export const AnimalSchema = z.object({
  name: z.string().min(3, "The animal's name must be at least 3 characters long."),
  specie: z.string().min(2, "The species must be at least 2 characters long.")
});

export const UserSchema = z.object({
  username: z.string(),
  password: z.string().min(6, "The password must be at least 6 characters long."),
  role: z.string().min(4).max(5).transform(val => val.toUpperCase()),
});

export const RegisterSchemma = z.object({
  username: z.string(),
  role: z.string(),
  password: z.string()
});