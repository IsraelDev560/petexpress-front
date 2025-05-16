"use client";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/schemas/formSchema';
import { AuthSection } from "./AuthForm";
import { FormComponent } from './FormComponent';
import { FieldConfig } from '@/types/AuthFormValues';

interface SectionProps {
    section: 'register' | 'login',
    setSection: React.Dispatch<React.SetStateAction<AuthSection>>;
}

export type LoginFormValues = z.infer<typeof loginSchema>;
export const loginFields: FieldConfig<LoginFormValues>[] = [
    { name: 'email', label: 'E-mail', type: 'email', description: 'Digite seu e-mail' },
    { name: 'password', label: 'Senha', type: 'password', description: 'Mínimo 6 caracteres' },
];

export function Login({ section, setSection }: SectionProps) {
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    function onSubmit(values: z.infer<typeof loginSchema>) {
        console.log(values)
    }
    return (
        <FormComponent
            title='Faça login'
            onSubmit={onSubmit}
            form={form}
            fields={loginFields}
            section={section}
            setSection={setSection}
        />
    )
}