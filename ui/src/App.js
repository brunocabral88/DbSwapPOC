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
import DbSettingsContext from './contexts/DbSettingsContext';
import GuardedComponent from './components/GuardedComponent';

const defaultDbValues = { 
  dbType: 'SQL_SERVER',
  dbServer: '',
  dbName: '',
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [dbOptions, setDbOptions] = useState(defaultDbValues);

  useEffect(() => {
    setLoggedIn(AuthService.isLoggedIn());
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      <DbSettingsContext.Provider value={{ dbOptions, setDbOptions }}>
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
      </DbSettingsContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
