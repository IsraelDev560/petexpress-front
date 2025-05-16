"use client";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/schemas/formSchema';
import { AuthSection } from './AuthForm';
import { FormComponent } from './FormComponent';
import { FieldConfig } from '@/types/AuthFormValues';

interface SectionProps {
    section: 'register' | 'login',
    setSection: React.Dispatch<React.SetStateAction<AuthSection>>;
}

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const registerFields: FieldConfig<RegisterFormValues>[] = [
    { name: 'username', label: 'Username', type: 'text', description: 'Digite seu nome' },
    { name: 'email', label: 'E-mail', type: 'email', description: 'Digite seu e-mail' },
    { name: 'password', label: 'Senha', type: 'password', description: 'Mínimo 6 caracteres' },
];


export function Register({ section, setSection }: SectionProps) {
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
        }
    })

    function onSubmit(values: z.infer<typeof registerSchema>) {
        console.log(values)
    }
    return (
        <FormComponent
            title='Crie sua conta'
            onSubmit={onSubmit}
            form={form}
            fields={registerFields}
            section={section}
            setSection={setSection}
        />
    )
}