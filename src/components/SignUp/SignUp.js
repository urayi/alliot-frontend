import React, { useState } from 'react';
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
import axios from 'axios';

const SignUp = () => {

  const [loading, setLoadingState] = useState(false);
  const [name, setNameState] = useState(); 
  const [email, setEmailState] = useState();
  const [password, setPasswordState] = useState();

  const signUp = () => {
    setLoadingState(true);
    const url = `/signup`;
    const body = {
      user: {
        name: name,
        email: email,
        password: password
      }
    };
    axios.post(url, body).then(response => {
      setLoadingState(false);
      setNameState(undefined)
      setEmailState(undefined);
      setPasswordState(undefined);
      console.log(response);
    }).catch(e => {
      setLoadingState(false);
      console.log(e);
    });
  }


  return (
    <Container maxWidth="xs">
      <div className={styles.SignUp} data-testid="SignUp">
        <Paper>
          <form className={styles.form} noValidate>
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
                  onChange={e => setNameState(e.target.value)}
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
                  onClick={() => signUp()}
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
