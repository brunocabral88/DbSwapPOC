import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';


const GuardedComponent = (props) => {
  const { isLoggedIn } = useContext(AuthContext);
  const { component: Component } = props;

  return (
    isLoggedIn ?
      <Component {...props} />
      :
      <Redirect to="/login" />
  )

};

export default GuardedComponent;