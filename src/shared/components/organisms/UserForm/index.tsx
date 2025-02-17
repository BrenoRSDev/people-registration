import { yupResolver } from "@hookform/resolvers/yup";
import { styled } from "@mui/material";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { BaseFormProps } from "../../../interfaces/BaseFormProps";
import { IFormError } from "../../../interfaces/FormError";
import { IUserFormData } from "../../../interfaces/UserFormData";
import {
  CPF_MASK,
  CPF_REGEX,
  TELEFONE_MASK,
  TELEFONE_REGEX,
} from "../../../utils/regexPatterns";
import { Button, InputMask, InputText } from "../../atoms";

const ContainerForm = styled("div")`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const ContainerInput = styled("div")`
  width: 100%;
  display: flex;
  gap: 10px;
`;

const Footer = styled("div")`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
`;

const schema: yup.ObjectSchema<IUserFormData> = yup
  .object({
    id: yup.string(),
    name: yup.string().required("Nome é obrigatório"),
    cpf: yup
      .string()
      .required("CPF é obrigatório")
      .matches(CPF_REGEX, "CPF inválido"),
    email: yup
      .string()
      .email("E-mail inválido")
      .required("E-mail é obrigatório"),
    telephone: yup
      .string()
      .required("Telefone é obrigatório")
      .matches(TELEFONE_REGEX, "Telefone inválido"),
  })
  .required();

function UserForm({ onSubmit, initialData }: BaseFormProps<IUserFormData>) {
  const form = useForm<IUserFormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (initialData) {
      form.setValue("id", initialData.id);
      form.setValue("name", initialData.name);
      form.setValue("cpf", initialData.cpf);
      form.setValue("email", initialData.email);
      form.setValue("telephone", initialData.telephone);
    }
  }, [initialData, form, form.setValue]);

  const handleFormSubmit = () => {
    const data = form.getValues();
    schema
      .validate(data, { abortEarly: false })
      .then((_) => {
        onSubmit(data);
      })
      .catch((err: yup.ValidationError) => {
        const validationErrors: IFormError = {};
        err.inner.forEach((error) => {
          if (!error.path) return;
          validationErrors[error.path] = error.message;
          form.trigger(error.path as any);
        });
      });
  };

  return (
    <ContainerForm>
      <FormProvider {...form}>
        <ContainerInput>
          <InputText name="name" label="Nome" />
          <InputMask name="cpf" label="CPF" mask={CPF_MASK} />
        </ContainerInput>
        <ContainerInput>
          <InputText name="email" label="E-mail" />
          <InputMask name="telephone" label="Telefone" mask={TELEFONE_MASK} />
        </ContainerInput>
      </FormProvider>
      <Footer>
        <Button onClick={handleFormSubmit} sx={{ float: "right" }}>
          Salvar
        </Button>
      </Footer>
    </ContainerForm>
  );
}

export default UserForm;
