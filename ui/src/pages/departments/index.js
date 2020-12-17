import React, { useState, useEffect } from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';

import DepartmentService from '../../services/DepartmentService';
import {
  Container,
  HeaderArea,
  DepartmentsTitle as HeaderTitle,
  GridContainer,
  RefreshButton,
} from './styles';
import { useContext } from 'react';
import DbTypeContext from '../../contexts/DbTypeContext';

const columns = [
  { name: 'departmentID', header: 'ID', defaultFlex: 1 },
  { name: 'name', header: 'Name', defaultFlex: 4 },
  { name: 'groupName', header: 'Group', defaultFlex: 3 },
  { name: 'modifiedDate', header: 'Modified', defaultFlex: 2 },
];

const Departments = () => {

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentDbType } = useContext(DbTypeContext);

  const loadDepartments = async () => {
    setLoading(true);
    const depts = await DepartmentService.getAllAsync();
    console.log('depts', depts);
    setDepartments(depts);
    setLoading(false);
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  useEffect(() => {
    loadDepartments();
  }, [currentDbType]);

  return (
    <Container>
      <HeaderArea>
        <HeaderTitle>Departments</HeaderTitle>
        <RefreshButton onClick={loadDepartments} />
      </HeaderArea>
      
      <GridContainer>
        {loading && <h6>Loading</h6>}
        {!loading && departments && departments.length > 0 && 
            <ReactDataGrid 
            columns={columns}
            dataSource={departments}
            style={{ minHeight: 500 }}
            pagination="local" />
        }
          
          
      </GridContainer>      
    </Container>
  )

}

export default Departments;