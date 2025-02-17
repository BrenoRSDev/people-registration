import { yupResolver } from "@hookform/resolvers/yup";
import AddIcon from "@mui/icons-material/Add";
import { Container, styled } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { UserListMock } from "../../../../assets/mocks/userListMock";
import { Button, InputText } from "../../atoms";
import { TableCustom } from "../../organisms";

const Header = styled(Container)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  margin-bottom: 32px;
`;

const Body = styled(Container)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const schema = yup.object({
  search: yup.string(),
});

const columns = [
  { field: "name", label: "Nome" },
  { field: "cpf", label: "CPF" },
  { field: "email", label: "E-mail" },
  { field: "telephone", label: "Telefone" },
];

function UserListTemplate() {
  const methodsFilterForm = useForm<any>({
    resolver: yupResolver(schema),
  });

  // const { handleSubmit } = methodsFilterForm;
  // const onSubmit: SubmitHandler<any> = (data) => console.log(data);

  const navigate = useNavigate();

  const navigateEdit = (id: string): void => {
    navigate(`/user/edit/${id}`);
  };

  return (
    <>
      <Header>
        <FormProvider {...methodsFilterForm}>
          <InputText
            sx={{ maxWidth: "300px" }}
            name="search"
            label="Pesquise..."
          />
          <NavLink to="/user/create" end>
            <Button endIcon={<AddIcon />}>Adicionar</Button>
          </NavLink>
        </FormProvider>
      </Header>
      <Body>
        <TableCustom
          columns={columns}
          rows={UserListMock}
          rowsPerPageOptions={[5, 10, 25]}
          showEditButton={true}
          showDeleteButton={true}
          onEdit={(row) => navigateEdit(row.id.toString())}
          onDelete={(row) => console.log("Delete", row)}
        />
      </Body>
    </>
  );
}

export default UserListTemplate;
