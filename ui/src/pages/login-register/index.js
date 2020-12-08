import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import {
  Container,
  TitleArea,
  Title,
  SubTitle,
  InputArea,
  InputGroup,
  InputTextBox,
  SubmitButton,
  RegisterButtonArea,
  RegisterButton,
  ErrorMessagesArea,
  ErrorItem,
} from './styles';

import FormContainer from '../../components/FormContainer';
import AuthService from '../../services/AuthService';
import AuthContext from '../../contexts/AuthContext';

const Login = ({ isRegistration }) => {

  const history = useHistory();
  const { loggedIn, setLoggedIn } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrrors] = useState([]);

  useEffect(() => {
    if (loggedIn) {
      history.push('/home');
    }
  }, [loggedIn, history]);

  const handleSetEmail = ({ target }) => setEmail(target.value);

  const handleSetPassword = ({ target }) => setPassword(target.value);

  const handleSubmitClick = async (ev) => {
    ev.preventDefault();
    setErrrors([]);

    if (!email || !password) {
      setErrrors([{ description: 'Please enter your username and password'}])
      return;
    }

    setLoading(true);

    const {success, errors} = isRegistration ? 
      await AuthService.register(email, password) 
      :
      await AuthService.authenticate(email, password);

    setLoading(false);
    if (success) {
      setLoggedIn(true);
      return history.push('/home');
    }

    setErrrors(errors);
  }

  const toggleRegisterLoginPages = () => {
    if (isRegistration) history.push('/login');
    else history.push('/register');
  }

  return (
    <Container fluid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <FormContainer onSubmit={handleSubmitClick}>
        
        <TitleArea>
          <Title>{isRegistration ? 'Registration' : 'Login'}</Title>
          <SubTitle>{ isRegistration ? 'Please register your account' : 'Please enter your existing credentials'}</SubTitle>
        </TitleArea>

        <InputArea>
          <InputGroup>
            <InputTextBox placeholder="E-mail"
              type="email"
              onChange={handleSetEmail} 
              value={email} />
          </InputGroup>

          <InputGroup>
            <InputTextBox type="password" 
              placeholder="Password" 
              onChange={handleSetPassword} 
              value={password} />
          </InputGroup>

        </InputArea>

        <SubmitButton type="submit" className="btn btn-primary" disabled={loading}>
          {isRegistration ? 'REGISTER' : 'LOGIN' }
        </SubmitButton>
        <RegisterButtonArea>
          <RegisterButton onClick={toggleRegisterLoginPages}>
            { isRegistration ? 'Already registered? Click here' : 'Not yet registered? Click here' }
          </RegisterButton>
        </RegisterButtonArea>

        {errors.length > 0 && 
          <ErrorMessagesArea className="alert alert-danger">
          {errors.map((err, key) => <ErrorItem key={key}>{err.description}</ErrorItem> )}
          </ErrorMessagesArea>
        }

      </FormContainer>
    </Container>
  )
}

export default Login;