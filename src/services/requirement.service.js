import axios from "axios";
import { convertToRaw } from 'draft-js';

const getRequirements = (ordenList) => {
  const url = `/api/v1/requirements`;
  return axios
    .get(url, { params: { order_list: ordenList} })
    .then(response => {
        return response.data;
    });
}

const getRequirement = (id) => {
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


export default {
  getRequirements,
  getRequirement,
  postRequirement,
};