import { TextFieldProps } from "@mui/material";

export type InputMaskProps = TextFieldProps & {
  name: string;
  mask: string | Array<(string | RegExp)>;
  onChangeValue?: (value: string) => void;
};



