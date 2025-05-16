import { AuthSection } from '@/components/AuthForm';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

export interface FieldConfig<T> {
  
  name: Path<T>;
  type: string,
  label: string;
  description?: string;
}

export interface FormProps<T extends FieldValues> {
  title: string;
  form: UseFormReturn<T>;
  onSubmit: (values: T) => void;
  fields: FieldConfig<T>[];
  section: 'register' | 'login',
  setSection: React.Dispatch<React.SetStateAction<AuthSection>>;
}