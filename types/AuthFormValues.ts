import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { Feedback } from './Feedback';

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
  feedback: Feedback,
  loading: boolean
}