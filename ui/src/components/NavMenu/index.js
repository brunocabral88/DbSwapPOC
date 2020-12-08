import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import {
  NavArea,
  BrandArea,
  BrandTitle,
  UserInfoArea,
  UserEmail,
  ToolBarArea,
  LogoutButton,
}
from './styles';

import AuthService from '../../services/AuthService';
import AuthContext from '../../contexts/AuthContext';

const NavMenu = () => {

  const history = useHistory();
  const { setLoggedIn } = useContext(AuthContext);

  const handleLogout = () => {
    AuthService.logout();
    setLoggedIn(false);
    history.push('/');
  }

  return (
    <NavArea>
      <BrandArea>
        <BrandTitle>DbSwapPOC</BrandTitle>
      </BrandArea>

      <UserInfoArea>
        <UserEmail>test@email</UserEmail>
      </UserInfoArea>

      <ToolBarArea>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </ToolBarArea>
    </NavArea>
  )
}

export default NavMenu;