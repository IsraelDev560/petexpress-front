import { z } from 'zod';

export const registerSchema = z.object({
    username: z.string().min(3, "Seu nome deve conter no minimo 3 letras."),
    password: z.string().min(6, "Sua senha deve ter no minimo 6 caracteres."),
    role: z.string().min(4).max(5),
})

export const loginSchema = z.object({
    username: z.string().min(3, "Seu nome deve conter no minimo 3 letras.").nonempty("Nome do usuário é obrigatório"),
    password: z.string().min(6, "Senha é obrigátoria.")
})

export type RegisterForm = typeof registerSchema;
export type LoginForm = typeof loginSchema;