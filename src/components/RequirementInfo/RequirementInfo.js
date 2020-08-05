import React, { useState } from 'react';
import styles from './RequirementInfo.module.css';
import { Editor, EditorState, convertFromRaw } from "draft-js";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

const RequirementInfo = () => {

  const [loading, setLoadingState] = useState(false);
  const [requirementId, setRequirementsId] = useState(1);
  const [title, setTitleState] = useState('');
  const [vote, setVoteState] = useState(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const getRequirement = () => {
    setLoadingState(true);
    const url = `/api/v1/requirements/${requirementId}`;
    axios.get(url).then(response => {
      setLoadingState(false);
      console.log(response);
      setRequirementsId(response.data.id); // Id del requerimiento
      const contentState = convertFromRaw(JSON.parse(response.data.content));
      setTimeout(() => setEditorState(EditorState.createWithContent(contentState)), 1000)//Contenido del Requerimiento
      // setTitleState(response.data.title); // Título del Requerimiento
    }).catch(e => {
      setLoadingState(false);
      console.log(e);
    });
  }

  const setVote = (voteSelected) => {
    setVoteState(voteSelected);
    setLoadingState(true);
    const url = `/api/v1/votes/requirement/${requirementId}`;
    const body = {
      vote: voteSelected
    };
    axios.put(url, body).then(response => {
      setLoadingState(false);
      const contentState = convertFromRaw(JSON.parse(response.data.content));
      setTitleState(response.data.title); // Título del Requerimiento
      setEditorState(EditorState.createWithContent(contentState)); //Contenido del Requerimiento
    }).catch(e => {
      setLoadingState(false);
      console.log(e);
    });
  }

  return (
    <div className={styles.RequirementInfo} data-testid="RequirementInfo" onClick={getRequirement}>
      CLICK
      {
        loading ? <CircularProgress /> : title && editorState ? 
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{title}</Typography>
            <ThumbUpAltIcon color={vote ? 'primary' : null} onClick={() => setVote(true)}/>
            <ThumbDownAltIcon color={!vote && vote !== null ? 'secondary' : null} onClick={() => setVote(false)}/>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Editor editorState={editorState} readOnly />
            </Typography>
          </AccordionDetails>
        </Accordion> :
        null
      }
    </div>
  );

}

RequirementInfo.defaultProps = {};

export default RequirementInfo;
