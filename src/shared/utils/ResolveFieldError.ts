import { FieldErrors, FieldValues } from "react-hook-form";

export const ResolveFieldError = (errors: FieldErrors<FieldValues>, controlName: string, ) => {
  const keys = controlName.split('.');
  let currentError: any = errors;
  for (let key of keys) {
    if (key?.includes('[') && key?.includes(']')) {
      const [arrayKey, index] = key?.split(/[\[\]]/).filter(Boolean);
      currentError = currentError?.[arrayKey]?.[index];
    } else {
      currentError = currentError?.[key];
      if (currentError === undefined) {
        return null;
      }
    }
  }
  return currentError;
}