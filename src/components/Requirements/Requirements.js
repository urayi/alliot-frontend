import React, { useState } from 'react';
import styles from './Requirements.module.css';
import Typography from '@material-ui/core/Typography';
import RequirementInfo from '../RequirementInfo/RequirementInfo';
import axios from 'axios';

const Requirements = (props) => {

  const [loading, setLoadingState] = useState(false); 
  const [requeriments, setRequerimentsState] = useState([]);

  return (
    <div className={styles.Requirements} data-testid="Requirements">
      <Typography component="h1" variant="h6">Requerimientos</Typography>
      {props.requirements ? props.requirements.map((requirement, key) => {
        return (
          <RequirementInfo requirement={requirement} />
        )
      }) : <h2 data-testid='no-data'>No se Encontraron Requerimientos</h2>}
    </div>
  );
}

Requirements.defaultProps = {};

export default Requirements;
