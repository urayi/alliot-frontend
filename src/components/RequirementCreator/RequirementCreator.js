import React, { useState, useEffect } from "react";
import styles from './RequirementCreator.module.css';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MUIRichTextEditor from 'mui-rte';
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

import RequirementService from '../../services/requirement.service';
import AuthService from "../../services/auth.service";

const RequirementCreator = (props) => {

  const [loading, setLoadingState] = useState(false);
  const [title, setTitleState] = useState('');
  const [content, setContentState] = useState([]);

  const defaultTheme = createMuiTheme();

  useEffect(() => {
    const currentToken = AuthService.getCurrentToken();
    if (!currentToken) {
      props.history.push('/login');
      window.location.reload();
    }
  }, []);


  Object.assign(defaultTheme, {
    overrides: {
      MUIRichTextEditor: {
        root: {
          width: "100%",
          padding: "0 16px 0 16px"
        },
        editor: {
          borderTop: "1px solid #C0C0C0",
          minHeight: "240px"
        }
      }
    }
  });

  const createRequirement = () => {
    setLoadingState(true);
    const requirement = {
      title: title,
      content: content
    };
    RequirementService.postRequirement(requirement).then(
      (response) => {
        setLoadingState(false);
        console.log(response);
        props.history.push("/");
      },
      (error) => {
        setLoadingState(false);
        console.log(error);
      }
    );
  }

  return (
    <div className={styles.RequirementCreator} data-testid="RequirementCreator">
      {
        loading ? <CircularProgress /> :
          <Paper className={styles.container}>
            <Typography component="h1" variant="h6" className={styles.title}>Crear Requerimiento</Typography>
            <form className={styles.form}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={3}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="title"
                    label="Título"
                    name="title"
                    autoComplete="off"
                    value={title}
                    onChange={evt => setTitleState(evt.target.value)}
                    xs={6} md={6}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Paper variant="outlined" className={styles.RichTexEditor}>
                    <MuiThemeProvider theme={defaultTheme}>
                      <MUIRichTextEditor
                        label="Describe tu requerimiento..."
                        onChange={evt => setContentState(evt)}
                        controls={["title", "bold", "italic", "underline", "strikethrough", "undo", "redo", "link", "numberList", "bulletList", "quote", "code"]}
                      />
                    </MuiThemeProvider>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={createRequirement}
                  >
                    Crear
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
      }
    </div>
  );
}

RequirementCreator.defaultProps = {};

export default RequirementCreator;
