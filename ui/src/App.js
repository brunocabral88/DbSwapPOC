import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import LoginRegister from './pages/login-register';
import Home from './pages/home';
import AuthService from './services/AuthService';
import NavMenu from './components/NavMenu';
import AuthContext from './contexts/AuthContext';

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
            {loggedIn &&
              <Route path="/home">
                <Home />
              </Route>
            }

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
