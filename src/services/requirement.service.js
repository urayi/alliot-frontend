import axios from "axios";
import { convertToRaw } from 'draft-js';

const getRequirements = (ordenList) => { // falta incluir orden
  const url = `/api/v1/requirements`;
  return axios
    .get(url, { params: { order_list: ordenList} })
    .then(response => {
        return response.data;
    });
}

const getRequirement = (id) => { // falta incluir orden
  const url = `/api/v1/requirements/${id}`;
  return axios
    .get(url)
    .then(response => {
        return response.data;
    });
}

const postRequirement = (requirement) => {
  const url = `/api/v1/requirements`;
  const body = {
    title: requirement.title,
    content: JSON.stringify(convertToRaw(requirement.content.getCurrentContent()))
  }
  return axios
    .post(url, body)
    .then(response => {
      return response.data;
    });
}

/* setRequirementsId(response.data.id); // Id del requerimiento
const contentState = convertFromRaw(JSON.parse(response.data.content));
setTimeout(() => setEditorState(EditorState.createWithContent(contentState)), 1000)//Contenido del Requerimiento
// setTitleState(response.data.title); // Título del Requerimiento */


export default {
  getRequirements,
  getRequirement,
  postRequirement,
};