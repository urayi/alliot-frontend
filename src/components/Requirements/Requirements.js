import React, { useState, useEffect } from 'react';
import styles from './Requirements.module.css';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import RequirementInfo from '../RequirementInfo/RequirementInfo';

import RequirementService from '../../services/requirement.service';
import AuthService from "../../services/auth.service";
import { Divider, IconButton } from '@material-ui/core';

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
        if(JSON.stringify(error).includes('401')) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          props.history.push('/login');
          window.location.reload();
          return false;
        }
      });
  }, [orderList, props.history]);


  return (
    <div className={styles.Requirements} data-testid="Requirements">
      {
        loading ? <CircularProgress /> :
        <Paper className={styles.container}>
          <Typography component="h1" variant="h6">Requerimientos</Typography>
          <IconButton onClick={()=>{setOrderList(
                orderList === 'title DESC' ? orderList === 'title ASC' ? 'title DESC' : 'title ASC' : 'title DESC'
              )}}>
            <SortByAlphaIcon/>
          </IconButton>
          <IconButton onClick={()=>{setOrderList(
                orderList === 'rank DESC' ? orderList === 'rank ASC' ? 'rank DESC' : 'rank ASC' : 'rank DESC'
              )}}>
            <HowToVoteIcon/>
          </IconButton>
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
