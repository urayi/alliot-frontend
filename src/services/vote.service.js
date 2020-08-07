import axios from "axios";

const setVote = (vote, requirementId) => {
  const url = `/api/v1/votes/requirement/${requirementId}`;
  const body = {
    vote: vote
  };
  return axios
    .put(url, body)
    .then(response => {
      return response.data;
    });
}

export default {
  setVote
};