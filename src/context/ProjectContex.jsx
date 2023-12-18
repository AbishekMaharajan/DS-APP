import { createContext, useEffect, useState } from "react";
import { getProjectData } from "../services/project.services";

export const ProjectContext = createContext("");

// eslint-disable-next-line react/prop-types
export const ProjectDataProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    (async () => {
      const data = await getProjectData();
      if (data) setProjects(data);
    })();
  }, []);

  const value = {
    open,
    projects,
    handleOpen,
    handleClose,
    setProjects,
  };
  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};
