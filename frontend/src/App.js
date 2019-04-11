import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Questions from './Questions/Questions'
import Question from './Question/Question'
import Login from './Login/Login'
import { AuthenticatedRoute } from './Authentication';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route exact path='/login' component={Login} />
          <AuthenticatedRoute exact path='/question/:questionId' component={Question} />
          <AuthenticatedRoute exact path='/' component={Questions} />
        </Switch>
      </div>
    );
  }
}

export default App;