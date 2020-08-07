import React, { useState, useEffect } from 'react';
import styles from './Requirements.module.css';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RequirementInfo from '../RequirementInfo/RequirementInfo';

import RequirementService from '../../services/requirement.service';
import AuthService from "../../services/auth.service";

const Requirements = (props) => {

  const [loading, setLoading] = useState(false); 
  const [requirements, setRequirements] = useState();
  const [orderList, setOrderList] = useState('created_at DESC');

  useEffect(() => {
    setLoading(true);
    const currentToken = AuthService.getCurrentToken();
    if (!currentToken) {
      props.history.push('/login');
      window.location.reload();
      return false;
    }
    RequirementService.getRequirements(orderList).then(
      response => {
        setLoading(false);
        setRequirements(response);
        console.log(response);
      },
      (error) => {
        console.log(error);
        setLoading(false);
        setOrderList(null);
        setRequirements([]);
      });
  }, [orderList, props.history]);


  return (
    <div className={styles.Requirements} data-testid="Requirements">
      {
        loading ? <CircularProgress /> :
        <Paper className={styles.container}>
          <Typography component="h1" variant="h6">Requerimientos</Typography>
          <Paper variant="outlined" className={styles.listContainer}>
            {
              requirements && requirements.length > 0 && !loading ? 
                requirements.map((item, key) => {
                  console.log(key, item)
                  return (
                      <RequirementInfo key={key} requirement={item} />
                  )
                }) :
              <Typography component="h6" variant="h6" className={styles.noData} data-testid='no-data'>
                No se Encontraron Requerimientos
              </Typography>
            }
          </Paper>
        </Paper>
      }
    </div>  
  );
}

Requirements.defaultProps = {};

export default Requirements;
