import React, { useState } from "react";
import styles from './RequirementCreator.module.css';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MUIRichTextEditor from 'mui-rte';
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';
import { convertToRaw } from 'draft-js';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import axios from 'axios';

const RequirementCreator = (props) => {

  const [loading, setLoadingState] = useState(false);
  const [title, setTitleState] = useState('');
  const [content, setContentState] = useState([])

  const defaultTheme = createMuiTheme();

  Object.assign(defaultTheme, {
    overrides: {
      MUIRichTextEditor: {
        root: {
          width: "100%",
          padding: "0 16px 0 16px"
        },
        editor: {
          borderTop: "1px solid #C0C0C0",
          minHeight: "80px"
        }
      }
    }
  })

  const createRequirement = (event) => {
    setLoadingState(true);
    const url = `/api/v1/requirements`;
    const body = {
      title: title,
      content: JSON.stringify(convertToRaw(content.getCurrentContent()))
    }
    axios.post(url, body).then(response => {
      setLoadingState(false);
      console.log(response);
    }).catch(e => {
      setLoadingState(false);
      console.log(e);
    });
  }

  return (
    <div className={styles.RequirementCreator} data-testid="RequirementCreator">
      {
        loading ? <CircularProgress /> :  
        <Paper>
          <form className={styles.form}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
