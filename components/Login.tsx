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
    {
        name: 'username',
        label: 'Username',
        type: 'text',
        description: 'Enter your username'
    },
    {
        name: 'password',
        label: 'Password',
        type: 'password',
        description: 'Enter your password'
    },
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
                    message: data.message || "Login failed. Please check your credentials.",
                    type: 'error',
                });
                return;
            }

            setFeedback({
                message: "Login successful!",
                type: 'success',
            });
            router.push('/petexpress')
        } catch (e: any) {
            const safeMessage =
                typeof e?.message === 'string'
                    ? e.message
                    : 'Unexpected error. Please try again later.';

            setFeedback({
                message: safeMessage,
                type: 'error',
            });
            console.log("Login error:", e);
        } finally {
            setLoading(false);
        }
    }
    return (
        <FormComponent
            title="Login to your account"
            onSubmit={onSubmit}
            form={form}
            fields={loginFields}
            feedback={feedback}
            loading={loading}
        />
    )
}