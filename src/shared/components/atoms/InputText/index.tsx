import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { InputTextProps } from "../../../interfaces/InputTextProps";
import { BaseFieldConfig } from "../../../utils/baseFieldConfig";
import { ResolveFieldError } from "../../../utils/resolveFieldError";

function InputText(props: InputTextProps) {
  const {
    register,
    setValue,
    control,
    formState: { errors },
  } = useFormContext();

  const handleInputChange = (value: string) => {
    setValue(props.name, value, { shouldValidate: true });
    if (props.onChangeValue) {
      props.onChangeValue(value);
    }
  };

  return (
    <Controller
      control={control}
      name={props.name}
      defaultValue={""}
      render={({ field }) => (
        <TextField
          {...BaseFieldConfig}
          {...props}
          {...field}
          rows={props.rows}
          error={!!ResolveFieldError(errors, props.name)}
          helperText={
            ResolveFieldError(errors, props.name)?.message?.toString() ?? ""
          }
          {...(register(props.name),
          { onChange: (e) => handleInputChange(e.target.value) })}
        />
      )}
    />
  );
}

export default InputText;