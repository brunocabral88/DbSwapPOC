import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import {
  Container,
  LogoArea,
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
import logo from '../../assets/logo.png';

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
      history.push('/departments');
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

    try {
      const {success, errors} = isRegistration ? 
        await AuthService.register(email, password) 
        :
        await AuthService.authenticate(email, password);

        if (success) {
          setLoggedIn(true);
          return history.push('/departments');
        }
    
        setErrrors(errors);

    } catch (e) {
      setErrrors([{ description: 'Failed to connect to the server, please try again later'}]);
    }

    

    setLoading(false);
  }

  const toggleRegisterLoginPages = () => {
    setErrrors([]);

    if (isRegistration) history.push('/login');
    else history.push('/register');
  }

  return (
    <Container>
      <FormContainer onSubmit={handleSubmitClick}>
        
        <LogoArea>
          <img src={logo} alt="logo" height="40" />
        </LogoArea>

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

        <SubmitButton type="submit" className="btn" disabled={loading}>
          {isRegistration ? 'REGISTER' : 'LOGIN' }
        </SubmitButton>
        <RegisterButtonArea>
          <RegisterButton onClick={toggleRegisterLoginPages}>
            { isRegistration ? 'Already registered? Click here' : 'Not yet registered? Click here' }
          </RegisterButton>
        </RegisterButtonArea>

        {errors.length > 0 && 
          <ErrorMessagesArea>
            {errors.map((err, key) => <ErrorItem key={key}>{err.description}</ErrorItem> )}
          </ErrorMessagesArea>
        }

      </FormContainer>
    </Container>
  )
}

export default Login;