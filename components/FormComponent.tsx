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
import FeedbackComponent from "./FeedbackComponent"
import MiniLoading from "./utils/MiniLoading"

export function FormComponent<T extends FieldValues>({ title, onSubmit, form, loading, feedback, fields }: FormProps<T>) {
    return (
        <div className='border p-6 rounded-lg'>
            <Form {...form}>
                <h2 className="text-xl font-bold pb-4">{title}</h2>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col">
                    {fields.map((field) => (
                        <FormField
                            key={field.name}
                            control={form.control}
                            name={field.name}
                            render={({ field: controller }) => (
                                <FormItem>
                                    <FormLabel>{field.label}</FormLabel>
                                    <FormControl>
                                        <Input type={field.type} placeholder={`${field.description}`} {...controller} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                    {feedback && <FeedbackComponent message={feedback.message} type={feedback.type} />}
                    {loading ? <MiniLoading /> : <Button className="cursor-pointer" type="submit">{'ENTRAR'}</Button>}
                </form>
            </Form>
        </div>
    )
}