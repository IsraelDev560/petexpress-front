"use client";
import { useState } from 'react';
import { Register } from './Register';
import { Login } from './Login';

export type AuthSection = 'login' | 'register';
export function AuthForm() {
    const [section, setSection] = useState<AuthSection>('login');

    return (
        <section className='flex flex-col w-full max-w-sm'>
            {section === 'login' && <Login section={section} setSection={setSection} />}
            {section === 'register' && <Register section={section} setSection={setSection} />}
        </section>
    )
}