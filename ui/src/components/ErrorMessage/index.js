import React from 'react';
import styled from 'styled-components';

const Link = styled.a`
  text-decoration: underline;
  cursor: pointer;
  margin-left: 5px;
`;

const ErrorMessage = ({ onRefresh }) => {
  return (
    <>
      Error loading data from the server. 
      { onRefresh && <><Link onClick={onRefresh}>Click</Link> to refresh</> }
    </>
  )
}

export default ErrorMessage;