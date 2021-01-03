import styled from 'styled-components';

const textColor = '#fff';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 100px;
`;

export const LogoArea = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  margin-top: 10px;
`;

export const TitleArea = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  width: 100%;
  text-align: center;
  padding: 10px;
  margin-top: 10px;
`;
export const Title = styled.span`
  color: ${textColor};
  font-size: 24pt;
`;

export const SubTitle = styled.h6`
  color: ${textColor};
`;

export const InputArea = styled.div`
  margin-top: 30px;
`;

export const InputGroup = styled.div`
  margin-bottom: 10px;
`;

export const InputTextBox = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 5px;
  padding-left: 8px;
  border: 0px;
`;

export const SubmitButton = styled.button`
  width: 100%;
  background-image: linear-gradient(180deg,#f67c1b 0,#e15500);
  color: #fff;

  &:hover {
    color: #ccc;
  }
`;

export const RegisterButtonArea = styled.div`
  width: 100%;
  text-align: center;
`;

export const RegisterButton = styled.a`
  width: 100%;
  text-align: center;
  color: white;
  cursor: pointer;
`;

const InnerErrorMessageArea = styled.div`
  margin-top: 15px;
`; 

export const ErrorMessagesArea = ({ children }) => 
  <InnerErrorMessageArea className="alert alert-danger"> {children} </InnerErrorMessageArea>

export const ErrorItem = styled.li``;