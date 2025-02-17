import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Button, Container, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { UserListMock } from "../../../../assets/mocks/userListMock";
import { IUserFormData } from "../../../interfaces/UserFormData";
import { UserForm } from "../../organisms";

const Header = styled(Container)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  margin-bottom: 32px;
  position: relative;
`;

const Body = styled(Container)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled("h2")`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
  z-index: -1;
`;

function UserFormTemplate() {
  const { id } = useParams();
  const [user, setUser] = useState<IUserFormData | null>(null);

  const useIsEdit = () => {
    return !!id;
  };

  const handleFormSubmit = (data: any) => {
    console.log("Formulário enviado com os dados:", data);
  };

  const getUserById = (id: string | undefined) => {
    if (id) {
      const foundUser = UserListMock.find((user) => user.id === id);
      if (foundUser) {
        return foundUser;
      }
      return null;
    }
    return null;
  };

  useEffect(() => {
    if (id) {
      const userData = getUserById(id);
      setUser(userData);
    }
  }, [id]);

  return (
    <>
      <Header>
        <NavLink to="/" end>
          <Button variant="outlined" startIcon={<ArrowBackIosNewIcon />}>
            Voltar
          </Button>
        </NavLink>
        <Title>{useIsEdit() ? "Editar Usuário" : "Criar Usuário"}</Title>
      </Header>
      <Body>
        <UserForm onSubmit={handleFormSubmit} initialData={user} />
      </Body>
    </>
  );
}

export default UserFormTemplate;
