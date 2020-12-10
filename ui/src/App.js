import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import LoginRegister from './pages/login-register';
import Departments from './pages/departments';
import Employees from './pages/employees';
import AuthService from './services/AuthService';
import NavMenu from './components/NavMenu';
import AuthContext from './contexts/AuthContext';
import GuardedComponent from './components/GuardedComponent';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(AuthService.isLoggedIn());
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      <Router>
        {loggedIn ?
          <NavMenu /> :
          <></>
        }
        <div>
          <Switch>
            <Route path="/employees">
              <GuardedComponent component={Employees} />
            </Route>

            <Route path="/departments">
              <GuardedComponent component={Departments} />
            </Route>

            <Route path="/login">
              <LoginRegister />
            </Route>

            <Route path="/register">
              <LoginRegister isRegistration />
            </Route>

            <Route path="/">
              <LoginRegister />
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
