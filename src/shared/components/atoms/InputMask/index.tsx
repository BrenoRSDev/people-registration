import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { InputMaskProps } from "../../../interfaces/InputMaskProps";
import React from "react";
import { IMaskInput } from "react-imask";
import { BaseFieldConfig } from "../../../utils/BaseFieldConfig";
import { ResolveFieldError } from "../../../utils/ResolveFieldError";

interface MaskedInputProps {
  mask: string;
  name: string;
  onChange: (event: { target: { name: string; value: string } }) => void;
  inputRef: React.Ref<HTMLInputElement>;
}

const MaskedInput = React.forwardRef<HTMLInputElement, MaskedInputProps>(
  function MaskedInput(props, ref) {
    const { mask, onChange, name, ...other } = props;

    return (
      <IMaskInput
        {...other}
        mask={mask}
        inputRef={ref}
        onAccept={(value: any) => onChange({ target: { name, value } })}
        overwrite
      />
    );
  }
);

function InputMask(props: InputMaskProps) {
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
          InputProps={{
            ...props.InputProps,
            inputComponent: MaskedInput as any,
            inputProps: {
              mask: props.mask,
            },
          }}
        />
      )}
    />
  );
}

export default InputMask;
