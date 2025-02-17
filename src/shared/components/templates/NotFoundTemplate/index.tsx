import { styled } from "@mui/material";
import { Button } from "../../atoms";
import { NavLink } from "react-router-dom";

const Container = styled("div")`
  width: 100%;
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 24px;
`;

function NotFoundTemplate() {
  return (
    <Container>
      <h3>Página não encontrada</h3>
      <NavLink to="/" end>
        <Button>Voltar</Button>
      </NavLink>
    </Container>
  );
}

export default NotFoundTemplate;
