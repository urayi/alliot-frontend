import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import styles from './Login.module.css';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import isotipo from '../../isotipo.png';
import axios from 'axios';

const Login = () => {

  const [loading, setLoadingState] = useState(false); 
  const [email, setEmailState] = useState();
  const [password, setPasswordState] = useState();

  const login = () => {
    setLoadingState(true);
    const url = `/login`;
    const body = {
      user: {
        email: email,
        password: password
      }
    };
    axios.post(url, body).then(response => {
      setLoadingState(false);
      setEmailState(undefined);
      setPasswordState(undefined);
      const token = response.headers.authorization;
      localStorage.setItem('token', token);
      console.log(response);
    }).catch(e => {
      setLoadingState(false);
      console.log(e);
    });
  }

  return (
    <Container maxWidth="xs">
      <div className={styles.Login} data-testid="Login">
        <Paper>
          <form className={styles.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Avatar className={styles.avatar} src={isotipo}></Avatar>
              </Grid>
              <Grid item xs={12}>
                <Typography className={styles.title} component="h1" variant="h5">Iniciar Sesión</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Correo Electrónico"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={e => setEmailState(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  onChange={e => setPasswordState(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={styles.submit}
                  onClick={() => login()}
                >
                  Iniciar Sesión
                </Button>
              </Grid>
              <Grid item>
                ¿No tienes un usuario? <Link href="/signup" variant="button">Registrate</Link>
              </Grid>
              <Grid item  xs={12}>
                { loading ? <CircularProgress /> : '' }
              </Grid>
            </Grid>
          </form>
        </Paper>
      </div>
    </Container>
  );
}

// Login.propTypes = {};

Login.defaultProps = {};

export default Login;
