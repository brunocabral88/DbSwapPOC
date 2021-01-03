import styled from 'styled-components';

const RefreshBtn = (props) => <button { ...props }>Refresh</button>;

const RefreshButton = styled(RefreshBtn)`
  padding: 5px;
  background-image: linear-gradient(180deg,#f67c1b 0,#e15500);
  color: white;
  width: 150px;
  border: 0;
`;

export default RefreshButton;