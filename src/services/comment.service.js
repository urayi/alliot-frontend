import axios from "axios";
import { convertToRaw } from 'draft-js';

const getComments = (requirementId) => {
  const url = `/api/v1/comments/requirement/${requirementId}`;
  return axios
    .get(url)
    .then(response => {
      return response.data;
    });
}

const postComment = (comment, requirementId) => {
  const url = `/api/v1/comments`;
  const body = {  
    comment: JSON.stringify(convertToRaw(comment.getCurrentContent())),
    requeriment_id: requirementId
  };
  return axios
    .post(url, body)
    .then(response => {
      return response.data;
    });
}

export default {
  getComments,
  postComment
};