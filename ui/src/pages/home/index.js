import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';

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

  const dataSource = [
    { id: 1, name: 'John McQueen', age: 35 },
    { id: 2, name: 'Mary Stones', age: 25 },
    { id: 3, name: 'Robert Fil', age: 27 },
    { id: 4, name: 'Roger Robson', age: 81 },
    { id: 5, name: 'Billary Konwik', age: 18 },
    { id: 6, name: 'Bob Martin', age: 18 },
    { id: 7, name: 'Matthew Richardson', age: 54 },
    { id: 8, name: 'Ritchie Peterson', age: 54 },
    { id: 9, name: 'Bryan Martin', age: 40 },
    { id: 10, name: 'Mark Martin', age: 44 },
    { id: 11, name: 'Michelle Sebastian', age: 24 },
    { id: 12, name: 'Michelle Sullivan', age: 61 },
    { id: 13, name: 'Jordan Bike', age: 16 },
    { id: 14, name: 'Nelson Ford', age: 34 },
    { id: 15, name: 'Tim Cheap', age: 3 },
    { id: 16, name: 'Robert Carlson', age: 31 },
    { id: 17, name: 'Johny Perterson', age: 40 },
  ];

  return (
    <div>
      Home Page
      <ReactDataGrid key="xunda" columns={[{ name: 'name' }, { name: 'age' }]} dataSource={dataSource} />
    </div>
  );
}

export default Home;