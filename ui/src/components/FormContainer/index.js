import React from 'react';

import {
  FormBox
}
from './styles';

const FormContainer = ({ children, onSubmit }) => {
  return (
    <FormBox method="POST" onSubmit={onSubmit} noValidate>
      {children}
    </FormBox>
  )
}

export default FormContainer;