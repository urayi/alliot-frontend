import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListAltIcon from '@material-ui/icons/ListAlt';
import CreateIcon from '@material-ui/icons/Create';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import logoBlanco from '../../assets/logoBlanco.png';
import AuthService from '../../services/auth.service';

const Dashboard = (props) => {

  const [username, setUsername] = useState(AuthService.getCurrentUser);
  

/*   useEffect(() => {
    const currenToken = AuthService.getCurrentToken();
    if(currenToken) {
      setIsSession(true);
    } else {
      setIsSession(false);
    }
  }, []); */

  const logout = () => {
    AuthService.logout();
    window.location.reload();
  }

  return (
    <div className={styles.Dashboard} data-testid="Dashboard">
      <AppBar position="static" className={styles.appBar}>
        <Toolbar>
          <img src={logoBlanco} alt='' />
          { props.isSession &&
            <Typography variant="h6">
              <Button color="inherit" href="/"><ListAltIcon />Requerimientos</Button>
            </Typography>
          }
          { props.isSession &&
            <Typography variant="h6" className={styles.title}>
              <Button color="inherit" href="/new"><CreateIcon />Nuevo</Button>
            </Typography>
          }
          <Typography variant="h6" className={styles.title}></Typography>
          { props.isSession &&
            <Typography variant="h6" component="h3" className={styles.name}>
              {username}
            </Typography>
          }
          { props.isSession &&
            <Tooltip title="Cerrar Sessión">
              <IconButton 
                edge="end"
                color="inherit"
                onClick={() => logout()}
              >
                <ExitToAppIcon />
              </IconButton>
            </Tooltip>
          }
        </Toolbar>
      </AppBar>
    </div>
  )
}

Dashboard.defaultProps = {};

export default Dashboard;
