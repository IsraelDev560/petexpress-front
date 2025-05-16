import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormProps } from "@/types/AuthFormValues"
import { FieldValues } from "react-hook-form"

export function FormComponent<T extends FieldValues>({ title, onSubmit, form, section, setSection, fields }: FormProps<T>) {
    return (
        <div className='border p-4 rounded-lg'>
            <Form {...form}>
                <h2 className="text-xl font-bold pb-4">{title}</h2>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
                    {fields.map((field) => (
                        <FormField
                            key={field.name}
                            control={form.control}
                            name={field.name}
                            render={({ field: controller }) => (
                                <FormItem>
                                    <FormLabel>{field.label}</FormLabel>
                                    <FormControl>
                                        <Input placeholder={`${field.description}`} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                    {section === 'login' ? (
                        <button className='text-sm cursor-pointer underline hover:text-blue-800' onClick={() => setSection("register")}>Não tem uma conta? Registe-se</button>
                    ) : <button className='text-sm cursor-pointer underline hover:text-blue-800' onClick={() => setSection("login")}>Já possui uma conta? Login</button>}
                    <Button className="cursor-pointer" type="submit">{section === 'login' ? 'ENTRAR' : 'CADASTRE-SE'}</Button>
                </form>
            </Form>
        </div>
    )
}