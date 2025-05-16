import { z } from 'zod';

export const registerSchema = z.object({
    username: z.string().min(3, "Seu nome deve conter no minimo 3 letras."),
    email: z.string().email("Email é obrigátorio"),
    password: z.string().min(6,"Sua senha deve ter no minimo 6 caracteres.")
})

export const loginSchema = z.object({
    email: z.string().email("Email é obrigátorio."),
    password: z.string().min(6, "Senha é obrigátoria.")
})

export type RegisterForm = typeof registerSchema;
export type LoginForm = typeof loginSchema;