import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';


const GuardedComponent = (props) => {
  const { loggedIn } = useContext(AuthContext);
  const { component: Component } = props;

  return (
    loggedIn ?
      <Component {...props} />
      :
      <Redirect to="/login" />
  )

};

export default GuardedComponent;