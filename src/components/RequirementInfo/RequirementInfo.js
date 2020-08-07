import React, { useState, useEffect } from 'react';
import styles from './RequirementInfo.module.css';
import { Editor, EditorState, convertFromRaw } from "draft-js";
import Accordion from '@material-ui/core/Accordion';
import Divider from '@material-ui/core/Divider';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import CircularProgress from '@material-ui/core/CircularProgress';
import VoteService from '../../services/vote.service';
import CommentService from '../../services/comment.service';
import RequirementService from '../../services/requirement.service';
import Comments from '../Comments/Comments';

const RequirementInfo = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vote, setVoteState] = useState(null);
  const [requirement, setRequirement] = useState(props.requirement);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    console.log(props);
    setLoading(true);
    if (props.requirement) {
      setRequirement(props.requirement);
      const contentConverted = JSON.parse(requirement.content);
      const contentState = convertFromRaw(contentConverted);
      setEditorState(EditorState.createWithContent(contentState)); //Contenido del Requerimiento
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  const voting = (event) => {
    console.log(event);
    setLoading(true);
    VoteService.setVote(event, requirement.id).then(
      (response) => {
        setLoading(false);
        console.log(response);
        setVoteState(response.vote);
        updateRequirement();
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

  const updateRequirement = () => {
    RequirementService.getRequirement(requirement.id).then(
      (response) => {
        setLoading(false);
        console.log(response);
        setRequirement(response);
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
  };

  return (
    <div className={styles.RequirementInfo} data-testid="RequirementInfo">
      {
        loading ? <CircularProgress /> : requirement.title && editorState &&
          <Accordion className={styles.accordion}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography component="h6" variant="h6">{requirement.title}</Typography>
              <Typography className={styles.title}></Typography>
              <Typography variant="subtitle2"className={styles.rank}>
                Puntos: {requirement.rank ? requirement.rank : 0}
              </Typography>
              <Typography className={vote ? styles.positive : styles.noVote}
                onClick={(event) => {voting(true)}}>
                <ThumbUpAltIcon />
              </Typography>
              <Typography className={!vote && vote !== null ? styles.negative : styles.noVote}
                onClick={(event) => {voting(false)}}>
                <ThumbDownAltIcon />
              </Typography>             
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
                <Editor editorState={editorState} readOnly />
            </AccordionDetails>
            <Divider />
            <AccordionDetails>
              <Comments requirement={requirement}/>
            </AccordionDetails>
          </Accordion>
      }
    </div>
  );
}

RequirementInfo.defaultProps = {};

export default RequirementInfo;
