import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';


const Home = () => {

  const { loggedIn } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    console.log('loggedIn', loggedIn);
    if (!loggedIn) {
      console.log('not logged in');
      history.push('/login');
    }
  }, [loggedIn, history]);

  return (
    <div>Home Page</div>
  );
}

export default Home;