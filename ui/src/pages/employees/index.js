import React, { useState, useEffect, useContext } from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';

import EmployeeService from '../../services/EmployeeService';
import {
  Container,
  HeaderTitle,
  GridContainer,
  HeaderArea,
} from './styles';
import ErrorMessage from '../../components/ErrorMessage';
import RefreshButton from '../../components/RefreshButton';
import DbTypeContext from '../../contexts/DbTypeContext';

const columns = [
  { name: 'businessEntityID', header: 'ID', defaultFlex: 1 },
  { name: 'nationalIDNumber', header: 'Document ID', defaultFlex: 2 },
  { name: 'loginID', header: 'Login', defaultFlex: 2 },
  { name: 'jobTitle', header: 'Job Title', defaultFlex: 2 },
  { name: 'birthDate', header: 'Birth Date', defaultFlex: 2 },
  { name: 'maritalStatus', header: 'Marital Status', defaultFlex: 1 },
  { name: 'hireDate', header: 'Hire Date', defaultFlex: 2 },
];

const Employees = () => {

  const [employees, setEmployees] = useState([]);
  const [hasErrors, setHasErrors] = useState(false);
  const [loading, setLoading] = useState(true);
  const { currentDbType } = useContext(DbTypeContext);

  const loadEmployees = async () => {
    setLoading(true);
    setHasErrors(false);
    setEmployees([]);

    try {
      const data = await EmployeeService.getAllEmployeesAsync();
      setEmployees(data);
    } catch (e) {
      console.error(e);
      setHasErrors(true);
    }

    setLoading(false);    
  }

  useEffect(() => {
    loadEmployees();
  }, [currentDbType]);

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <Container>
      <HeaderArea>
        <HeaderTitle>Employees</HeaderTitle>
        <RefreshButton onClick={loadEmployees} />
      </HeaderArea>

      <GridContainer>
        {hasErrors && <ErrorMessage onRefresh={loadEmployees} />}
        {loading && <h6>Loading...</h6>}
        {!loading && employees && employees.length > 0 && 
          <ReactDataGrid 
            columns={columns}
            dataSource={employees}
            style={{ minHeight: 500 }}
            pagination="local" />
        }
      </GridContainer>
    </Container>
  )

}

export default Employees;