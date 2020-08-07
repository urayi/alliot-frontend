import React, { useState, useEffect } from 'react';
import styles from './SignUp.module.css';
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

const SignUp = (props) => {

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(); 
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    const currentToken = AuthService.getCurrentToken();
    if (currentToken) {
      props.history.push('/');
      window.location.reload();
    }
  }, []);

  const signUp = (event) => {
    event.preventDefault();
    setLoading(true);
    AuthService.signUp(name, email, password).then(
      (response) => {
        setLoading(false);
        console.log(response);
        props.history.push("/login");
        // window.location.reload();
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
      <div className={styles.SignUp} data-testid="SignUp">
        <Paper>
          <form className={styles.form} noValidate onSubmit={(event) => signUp(event)}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <Avatar className={styles.avatar} src={isotipo} />
              </Grid>
              <Grid item xs={12}>
                <Typography className={styles.title} component="h1" variant="h5">Crear Usuario</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  name="username"
                  variant="outlined"
                  required
                  fullWidth
                  label="Nombre"
                  autoFocus
                  onChange={e => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Correo Electrónico"
                  name="email"
                  autoComplete="email"
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
                  Registrar
                </Button>
              </Grid>
              <Grid item  xs={12}>
                ¿Ya tienes un usuario? <Link href="/login" variant="button">Inicia Sessión</Link>
              </Grid>
              <Grid item  xs={12}>
                { loading ? <CircularProgress className={styles.loading}/> : '' }
              </Grid>
            </Grid>
          </form>
        </Paper>
      </div>
    </Container>
  );
}


SignUp.defaultProps = {};

export default SignUp;
