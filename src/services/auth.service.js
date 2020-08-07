import axios from "axios";

const signUp = (name, email, password) => {
  const url = `/signup`;
  const body = {
    user: {
      name: name,
      email: email,
      password: password
    }
  };
  return axios
    .post(url, body)
    .then(response => {
      return response.data;
    });
}

const login = (email, password) => {
  const url = `/login`;
  const body = {
    user: {
      email: email,
      password: password
    }
  };
  return axios
    .post(url, body)
    .then((response) => {
      console.log(response);
      if (response.data.token) {
        localStorage.setItem('token', `Bearer ${response.data.token}`);
      }
      localStorage.setItem('user', response.data.user.name);
      return response.data.user;
    });
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  const url = `/logout`;
  return axios.delete(url);
};

const getCurrentToken = () => {
  return localStorage.getItem('token');
};

const getCurrentUser = () => {
  return localStorage.getItem('user')
}

export default {
  signUp,
  login,
  logout,
  getCurrentToken,
  getCurrentUser,
};