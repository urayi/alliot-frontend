import React, { useState } from "react";
import PropTypes from 'prop-types';
import styles from './RequirementCreator.module.css';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MUIRichTextEditor from 'mui-rte'
import Button from "@material-ui/core/Button";
import { convertToRaw } from 'draft-js';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import axios from 'axios';

const RequirementCreator = (props) => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState([])

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
    const url = 'http://localhost:3000/api/v1/requirements';
    const body = {
      title: title,
      content: JSON.stringify(convertToRaw(content.getCurrentContent()))
    }
    axios.post(url, body).then(response => {
      console.log(response);
    }).catch(e => {
      console.log(e);
    });
  }

  return (
    <div className={styles.RequirementCreator} data-testid="RequirementCreator">
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
                onChange={evt => setTitle(evt.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Paper variant="outlined" className={styles.RichTexEditor}>
                <MuiThemeProvider theme={defaultTheme}>
                  <MUIRichTextEditor
                    label="Describe tu requerimiento..."
                    onChange={evt => setContent(evt)}
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
    </div>
  );
}

RequirementCreator.propTypes = {};

RequirementCreator.defaultProps = {};

export default RequirementCreator;
