import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import DbTypeService from '../../services/DbTypeService';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import AuthService from '../../services/AuthService';
import AuthContext from '../../contexts/AuthContext';

const NavMenu = () => {

  const history = useHistory();
  const { setLoggedIn } = useContext(AuthContext);
  const [databaseType, setDatabaseType] = useState('SQL_SERVER');

  const handleChangeDatabaseType = async (dbType) => {
    if (window.confirm(`Change database to ${dbType}?`)) {
      await DbTypeService.setDatabaseType(dbType);
      setDatabaseType(dbType);
    }
  }

  const handleLogout = () => {
    AuthService.logout();
    setLoggedIn(false);
    history.push('/');
  }

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">DbSwapPOC</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav pull-right">
        <Nav className="mr-auto">
          <Nav.Link onClick={() => history.push('/departments')}>Departments</Nav.Link>
          <Nav.Link onClick={() => history.push('/employees')}>Employees</Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown title="Databases" id="basic-nav-dropdown">
            <NavDropdown.Item 
              active={databaseType === 'SQL_SERVER'} 
              href="#" 
              onClick={() => handleChangeDatabaseType('SQL_SERVER')}>
                SQL Server
            </NavDropdown.Item>
            <NavDropdown.Item 
              href="#" 
              active={databaseType === 'POSTGRES'}
              onClick={() => handleChangeDatabaseType('POSTGRES')}>
                PostgreSQL
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <NavDropdown title="Menu" id="basic-nav-dropdown">
            {/* <NavDropdown.Divider /> */}
            <NavDropdown.Item href="#" onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavMenu;