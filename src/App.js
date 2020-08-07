import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Requirements from './components/Requirements/Requirements';
import RequirementCreator from './components/RequirementCreator/RequirementCreator';

import AuthService from './services/auth.service';

function App(props) {  

  const [isSession, setIsSession] = useState(false);

  useEffect(() => {
    const currenToken = AuthService.getCurrentToken();
    if(currenToken) {
      setIsSession(true);
    } else {
      setIsSession(false);
    }
  }, []);

  return (
    <Router>
      <Dashboard isSession={isSession}/>
      <div data-testid="App">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/" component={Requirements} />
          <Route exact path="/new" component={RequirementCreator} />
          <Redirect from='*' to='/login' />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
