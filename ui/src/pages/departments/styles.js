import styled from 'styled-components';

export const Container = styled.div``;

export const DepartmentsTitle = styled.h2`
  color: #9a9a9a;
`;

export const GridContainer = styled.div`
  margin-top: 10px;
  text-align: center;
`;

export const HeaderArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 8px;
`;

const RefreshBtn = (props) => <button { ...props }>Refresh</button>;

export const RefreshButton = styled(RefreshBtn)`
  padding: 5px;
  background-color: green;
  color: white;
  width: 150px;
  border: 0;
`;