import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styles from './Dashboard.module.css';
import RequirementCreator from '../RequirementCreator/RequirementCreator';
import Requirements from '../Requirements/Requirements';

const Dashboard = () => (
  <div className={styles.Dashboard} data-testid="Dashboard">
    Dashboard Component
    <BrowserRouter>
      <Switch>
        <Route exact path="/new" component={Requirements}/>
        <Route exact path="/" component={RequirementCreator}/>
      </Switch>
    </BrowserRouter>
  </div>
);

Dashboard.defaultProps = {};

export default Dashboard;
