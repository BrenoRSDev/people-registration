import { TextFieldProps } from "@mui/material";

export type InputTextProps = TextFieldProps & {
  name: string;
  onChangeValue?: (value: string) => void;
};
