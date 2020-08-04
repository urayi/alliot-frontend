import React from 'react';
import PropTypes from 'prop-types';
import styles from './Login.module.css';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import isotipo from '../../isotipo.png';

const Login = () => (
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
                id="email"
                label="Correo Electrónico"
                name="email"
                autoComplete="email"
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
                id="password"
                autoComplete="current-password"
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
            <Grid item>
              ¿No tienes un usuario? <Link href="#" variant="body">Registrate</Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  </Container>
);

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
