import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 100px;
`;

export const TitleArea = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  width: 100%;
  text-align: center;
  padding: 10px;
`;
export const Title = styled.span`

  font-size: 24pt;
`;

export const SubTitle = styled.h6``;

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
`;

export const RegisterButtonArea = styled.div`
  width: 100%;
  text-align: center;
`;

export const RegisterButton = styled.a`
  width: 100%;
  text-align: center;
  cursor: pointer;
`;

const InnerErrorMessageArea = styled.div`
  margin-top: 15px;
`; 

export const ErrorMessagesArea = ({ children }) => 
  <InnerErrorMessageArea className="alert alert-danger"> {children} </InnerErrorMessageArea>

export const ErrorItem = styled.li``;