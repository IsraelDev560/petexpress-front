"use client";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/schemas/formSchema';
import { FormComponent } from './FormComponent';
import { FieldConfig } from '@/types/AuthFormValues';
import { useState } from 'react';
import { apiClient } from '@/lib/apiClient';
import { Feedback } from '@/types/Feedback';
import { useRouter } from 'next/navigation';

export type LoginFormValues = z.infer<typeof loginSchema>;
export const loginFields: FieldConfig<LoginFormValues>[] = [
    { name: 'username', label: 'Username', type: 'text', description: 'Digite seu username' },
    { name: 'password', label: 'Senha', type: 'password', description: 'Digite sua senha' },
];

export function Login() {
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: '',
            password: '',
        }
    })
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [feedback, setFeedback] = useState<Feedback>({ message: '', type: '' })

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        try {
            setLoading(true);
            const { res, data } = await apiClient("/api/auth/login", {
                method: 'POST',
                body: values
            }) as { res: Response, data: { token: string, message?: string, timeStamp: string, status: number } }

            if (!res.ok) {
                setFeedback({
                    message: data.message || "Erro ao fazer login",
                    type: 'error'
                });
                return;
            }

            setFeedback({
                message: "Login realizado com sucesso!",
                type: 'success'
            });
            router.push('/dashboard')
        } catch (e: any) {
            setFeedback({
                message: e?.message || "Erro inesperado.",
                type: 'error'
            });
            console.log("Erro no login:", e);
        } finally{
            setLoading(false);
        }
    }
    return (
        <FormComponent
            title='Faça login'
            onSubmit={onSubmit}
            form={form}
            fields={loginFields}
            feedback={feedback}
            loading={loading}
        />
    )
}