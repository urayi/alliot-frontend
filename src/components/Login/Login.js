import React, { useState, useEffect } from 'react';
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

import AuthService from '../../services/auth.service';

const Login = (props) => {

  const [loading, setLoading] = useState(false); 
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    const currentToken = AuthService.getCurrentToken();
    if (currentToken) {
      props.history.push('/new');
      window.location.reload();
    }
  }, []);

  const login = (event) => {
    event.preventDefault();
    setLoading(true);
    AuthService.login(email, password).then(
      (response) => {
        setLoading(false);
        console.log(response);
        props.history.push("/new");
        window.location.reload();
      },
      (error) => {
        setLoading(false);
        console.log(error);
      }
    );
    return false;
  }

  return (
    <Container maxWidth="xs">
      <div className={styles.Login} data-testid="Login">
        <Paper>
          <form className={styles.form} noValidate onSubmit={(event) => login(event)}>
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
                  onChange={e => setEmail(e.target.value)}
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
                  onChange={e => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={styles.submit}
                  
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
