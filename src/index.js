import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import CssBaseline from '@material-ui/core/CssBaseline';
import axios from 'axios';

// Configuración Inicial de peticiones a los servicios
axios.defaults.baseURL = 'http://localhost:3000' || process.env.BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

// Interceptor para incluir el token en las peticiones 
axios.interceptors.request.use(function (config) {
  config.headers['access-control-allow-origin'] = '*'
  if (localStorage.getItem('token')) {
    config.headers['authorization'] = localStorage.getItem('token');
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

ReactDOM.render(
  <BrowserRouter>
    <CssBaseline />
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
