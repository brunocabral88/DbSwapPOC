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
import DbSettingsContext from '../../contexts/DbSettingsContext';

const columns = [
  { name: 'businessentityid', header: 'ID', defaultFlex: 1 },
  { name: 'nationalidnumber', header: 'Document ID', defaultFlex: 2 },
  { name: 'loginid', header: 'Login', defaultFlex: 2 },
  { name: 'jobtitle', header: 'Job Title', defaultFlex: 2 },
  { name: 'birthdate', header: 'Birth Date', defaultFlex: 2 },
  { name: 'maritalstatus', header: 'Marital Status', defaultFlex: 1 },
  { name: 'hiredate', header: 'Hire Date', defaultFlex: 2 },
];

const Employees = () => {

  const [employees, setEmployees] = useState([]);
  const [hasErrors, setHasErrors] = useState(false);
  const [loading, setLoading] = useState(true);
  const { dbOptions } = useContext(DbSettingsContext);

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
  }, [dbOptions]);

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