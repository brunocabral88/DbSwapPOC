import React, { useState, useEffect } from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';

import EmployeeService from '../../services/EmployeeService';
import {
  Container,
  HeaderTitle,
  GridContainer,
} from './styles';

const columns = [
  { name: 'businessEntityID', header: 'ID', defaultFlex: 1 },
  { name: 'nationalIDNumber', header: 'Document ID', defaultFlex: 2 },
  { name: 'loginID', header: 'Login', defaultFlex: 2 },
  { name: 'jobTitle', header: 'Job Title', defaultFlex: 2 },
  { name: 'birthDate', header: 'Birth Date', defaultFlex: 2 },
  { name: 'maritalStatus', header: 'Marital Status', defaultFlex: 1 },
  { name: 'hireDate', header: 'Hire Date', defaultFlex: 2 },
];

export default () => {

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadEmployees = async () => {
    setLoading(true);

    try {
      const data = await EmployeeService.getAllEmployeesAsync();
      setEmployees(data);
    } catch (e) {
      console.error(e);
    }

    setLoading(false);
    
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <Container>
      <HeaderTitle>Employees</HeaderTitle>

      {loading && <h6>Loading...</h6>}

      <GridContainer>
        {employees && employees.length > 0 && 
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