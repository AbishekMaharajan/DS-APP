import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Container, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import MUITable from "./components/MUITable";
import Navbar from "./components/Navbar";
import ProjectCreateModal from "./components/ProjectCreateModal";
import { ProjectDataProvider } from "./context/ProjectContex";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <ProjectDataProvider>
        <ProjectListPage />
        <ProjectCreatePage />
        <ProjectCreateModal />
      </ProjectDataProvider>
    </ThemeProvider>
  );
}

export default App;

const ProjectListPage = () => {
  return (
    <Container>
      <MUITable />
    </Container>
  );
};

const ProjectCreatePage = () => {
  return <div></div>;
};
