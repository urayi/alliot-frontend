import React, { useState, useEffect } from 'react';
import styles from './CommentCreator.module.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MUIRichTextEditor from 'mui-rte';
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import CommentInfo from '../CommentInfo/CommentInfo';
import Divider from '@material-ui/core/Divider';

import CommentService from '../../services/comment.service';
import AuthService from "../../services/auth.service";

const CommentCreator = (props) => {

  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState([]);
  const [comments, setComments] = useState([])
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
  });

  useEffect(() => {
    setLoading(true);
    setComment([]);
    const currentToken = AuthService.getCurrentToken();
    if (!currentToken) {
      props.history.push('/login');
      window.location.reload();
    }
    getComments();
  }, []);

  const createComment = () => {
    setLoading(true);
    CommentService.postComment(comment, props.requirement.id).then(
      (response) => {
        setLoading(false);
        console.log(response);
        getComments()
      },
      (error) => {
        setLoading(false);
        console.log(error);
        if(JSON.stringify(error).includes('401')) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          props.history.push('/login');
          window.location.reload();
          return false;
        }
      }
    );
  }

  const getComments = () => {
    CommentService.getComments(props.requirement.id).then(
      (response) => {
        setLoading(false);
        console.log(response);
        setComments(response);
      },
      (error) => {
        setLoading(false);
        console.log(error);
        if(JSON.stringify(error).includes('401')) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          props.history.push('/login');
          window.location.reload();
          return false;
        }
      }
    );
  }

  return (
    <div className={styles.CommentCreator} data-testid="CommentCreator">
      {
        loading ? <CircularProgress /> :
          <div>
            <form className={styles.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Paper variant="outlined" className={styles.RichTexEditor}>
                    <MuiThemeProvider theme={defaultTheme}>
                      <MUIRichTextEditor
                        label="Escribe un comentario..."
                        onChange={evt => setComment(evt)}
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
                    onClick={createComment}
                  >
                    Comentar
                    </Button>
                </Grid>
              </Grid>
            </form>
            <Divider />
            <Paper variant="outlined" className={styles.container}>
              {
                comments && comments.length > 0 && !loading ? 
                  comments.map((item, key) => {
                    console.log(key, item)
                    return (
                      <CommentInfo key={key} comment={item.comment} />
                    )
                  }) :
                <Typography variant="subtitle2" className={styles.noData} data-testid='no-data'>
                  No se hay comentarios 
                </Typography>
              }
            </Paper>          
          </div>
      }
    </div>
  );
}

CommentCreator.defaultProps = {};

export default CommentCreator;
