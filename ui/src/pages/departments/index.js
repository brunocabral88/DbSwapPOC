import React, { useState, useEffect } from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';

import DepartmentService from '../../services/DepartmentService';
import {
  Container,
  DepartmentsTitle as HeaderTitle,
  GridContainer,
} from './styles';

const columns = [
  { name: 'departmentID', header: 'ID', defaultFlex: 1 },
  { name: 'name', header: 'Name', defaultFlex: 2 },
  { name: 'groupName', header: 'Group', defaultFlex: 2 },
  { name: 'modifiedDate', header: 'Modified', defaultFlex: 2 },
]

export default () => {

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDepartments = async () => {
    const depts = await DepartmentService.getAllAsync();
    console.log('depts', depts);
    setDepartments(depts);
    setLoading(false);
  };

  useEffect(() => {
    loadDepartments();
    
  }, []);

  return (
    <Container>
      <HeaderTitle>Departments</HeaderTitle>
      {loading && <h6>Loading</h6>}

      <GridContainer>
        {departments && departments.length > 0 && 
          <ReactDataGrid 
            columns={columns} 
            dataSource={departments}
            style={{ minHeight: 500 }}
            pagination="local" />}
      </GridContainer>
      
    </Container>
  )

}