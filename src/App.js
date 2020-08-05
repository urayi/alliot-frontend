import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';

function App() {    

  return (
    <div data-testid="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Dashboard}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup" component={SignUp}/>
        </Switch>
      </BrowserRouter>
    </div>
    
    
  );
}

export default App;
