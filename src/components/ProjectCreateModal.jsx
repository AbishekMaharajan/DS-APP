import { useContext, useState } from "react";
import {
  Box,
  Fade,
  Modal,
  TextField,
  Backdrop,
  Typography,
  Button,
  Radio,
  FormLabel,
  FormControl,
  FormControlLabel,
  RadioGroup,
} from "@mui/material";

import { ProjectContext } from "../context/ProjectContex";
import { addNewProject } from "../services/project.services";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
};

const initialValue = {
  title: {
    value: "",
    error: false,
    errorMessage: "You must enter a title",
  },
  description: {
    value: "",
    error: false,
    errorMessage: "You must enter an description",
  },
  status: {
    value: "inProgress",
    error: false,
    errorMessage: "You must choose a status",
  },
};

export default function ProjectCreateModal() {
  const { open, handleClose, setProjects } = useContext(ProjectContext);
  const [formValues, setFormValues] = useState(initialValue);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name],
        value,
        error: false,
      },
    });
  };
  const closeModal = () => {
    setFormValues(initialValue);
    handleClose();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formFields = Object.keys(formValues);
    let newFormValues = { ...formValues };

    for (let index = 0; index < formFields.length; index++) {
      const currentField = formFields[index];
      const currentValue = formValues[currentField].value;

      if (currentValue === "") {
        newFormValues = {
          ...newFormValues,
          [currentField]: {
            ...newFormValues[currentField],
            error: true,
          },
        };
      }
    }

    setFormValues(newFormValues);

    // if (
    //   newFormValues.title.error &&
    //   newFormValues.description.error &&
    //   newFormValues.status.error
    // )
    //   return;

    if (Object.values(newFormValues).some((field) => field.error)) return;

    const params = {
      id: Date.now(),
      title: newFormValues.title.value,
      description: newFormValues.description.value,
      status: newFormValues.status.value,
    };

    const response = await addNewProject(params);
    if (response) {
      setProjects((prev) => [...prev, response]);
      closeModal();
    }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <form noValidate onSubmit={handleSubmit}>
          <Box sx={style}>
            <Typography variant="h6" component="h6" sx={{ mb: 2 }}>
              Add New Project
            </Typography>
            <TextField
              label="Title"
              sx={{ mb: 2 }}
              fullWidth
              autoFocus
              name="title"
              margin="dense"
              variant="standard"
              value={formValues.title.value}
              onChange={handleChange}
              error={formValues.title.error}
              helperText={
                formValues.title.error && formValues.title.errorMessage
              }
            />
            <TextField
              sx={{ mb: 4 }}
              label="Description"
              fullWidth
              multiline
              name="description"
              margin="dense"
              variant="standard"
              value={formValues.description.value}
              onChange={handleChange}
              error={formValues.description.error}
              helperText={
                formValues.description.error &&
                formValues.description.errorMessage
              }
            />
            <FormControl fullWidth sx={{ mb: 5 }}>
              <FormLabel id="status-label">Status</FormLabel>
              <RadioGroup
                row
                aria-labelledby="status-label"
                name="status"
                value={formValues.status.value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="inProgress"
                  control={<Radio />}
                  label="InProgress"
                />
                <FormControlLabel
                  value="completed"
                  control={<Radio />}
                  label="Completed"
                />
              </RadioGroup>
            </FormControl>
            <Box textAlign={"center"}>
              <Button
                type="reset"
                variant="outlined"
                color="error"
                size="small"
                style={{ marginRight: "20px" }}
                onClick={closeModal}
              >
                Cancel
              </Button>

              <Button
                variant="outlined"
                type="submit"
                size="small"
                color="success"
              >
                Save
              </Button>
            </Box>
          </Box>
        </form>
      </Fade>
    </Modal>
  );
}
