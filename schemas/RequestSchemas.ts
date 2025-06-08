
import { z } from 'zod';

export const TaskSchema = z.object({
  taskTypeName: z.string(),
  animalId: z.string(),
  description: z.string(),
  date: z.date()
});

export const TaskTypeSchema = z.object({
  name: z.string(),
  description: z.string(),
});


export const AnimalSchema = z.object({
  name: z.string(),
  specie: z.string()
})

export const UserSchema = z.object({
  username: z.string(),
  password: z.string(),
  role: z.string().transform(val => val.toUpperCase()),
})

export const RegisterSchemma = z.object({
  username: z.string(),
  role: z.string(),
  password: z.string()
})