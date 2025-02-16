import { Box, CssBaseline, Container, styled } from '@mui/material';
import { ReactNode } from 'react';

// Estilo customizado com styled-components
const PageWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const PageHeader = styled(Box)`
  background-color: #1976d2;
  color: white;
  padding: 10px;
  text-align: center;
`;

const PageContent = styled(Container)`
  flex-grow: 1;
  padding: 20px;
`;

const PageFooter = styled(Box)`
  background-color: #f1f1f1;
  padding: 10px;
  text-align: center;
  margin-top: auto;
`;

type PageTemplateProps = {
    children: React.ReactNode;
};

function PageTemplate({ children }: PageTemplateProps) {
  return (
    <PageWrapper>
      <CssBaseline />
      <PageHeader>
        <h1>Cadastro de Pessoas</h1>
      </PageHeader>
      <PageContent maxWidth="lg">
        {children}
      </PageContent>
      <PageFooter>
        <p>© 2025 Cadastro de Pessoas. Todos os direitos reservados.</p>
      </PageFooter>
    </PageWrapper>
  );
};

export default PageTemplate;
