import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavArea = styled.div`
  background-color: grey;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 7px;
`;

export const BrandArea = styled.div`
  padding-left: 5px;
`;
export const BrandTitle = styled(Link)`
  color: white;
  font-weight: bold;

  :hover {
    text-decoration: none;
    color: #ddd;
  }
`;
export const UserInfoArea = styled.div``;
export const UserEmail = styled.span``;
export const ToolBarArea = styled.div`
  background-color: yellow;
  justify-content: flex-end;
`;

export const DropDownArea = styled.div`
  background-color: green
`;
export const DropDownList = styled.div``;
export const DropDownItem = styled.div``;