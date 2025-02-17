export type BaseFormProps<T> = {
  onSubmit: (data: T) => void;
  initialData: T | null;
};
