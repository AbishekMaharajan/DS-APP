import axios from "axios";

// const BASE_URL = "http://localhost:8000";
const BASE_URL = "/api";

export const getProjectData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/projects`);
    if (response?.status !== 200 || !response?.data)
      throw new Error("Error in fetching data");
    return response.data;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

export const addNewProject = async (params) => {
  try {
    const response = await axios.post(`${BASE_URL}/projects`, params);
    if (response?.status !== 201 || !response?.data)
      throw new Error("Error in fetching data");
    return response.data;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

export const deleteProject = async (ids) => {
  try {
    const deleteRecords = ids?.map((id) => deleteIndividualProject(id));

    const response = await Promise.all(deleteRecords);
    return response?.every((res) => res === true) ?? false;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

function deleteIndividualProject(id) {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${BASE_URL}/projects/${id}`)
      .then(() => resolve(true))
      .catch(() => reject(false));
  });
}
