import React, { useCallback, useEffect, useState } from 'react';
import {
  Button, Input, InputNumber, notification,
} from 'antd';
import AdminLayout from 'components/AdminLayout';
import searchIcon from 'assets/img/search-icon.svg';
import addUserIcon from 'assets/img/add-user-icon.svg';
import api from 'utils/api-rest';
import EmployeesTable from './components/EmployeesTable';
import EmployeeForm from './components/EmployeeForm';
import './Employees.less';

function EmployeesPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterNameAndEmail, setFilterNameAndEmail] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterAge, setFilterAge] = useState();
  const [filterSalaryMin, setFilterSalaryMin] = useState();
  const [filterSalaryMax, setFilterSalaryMax] = useState();
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const filterData = useCallback(() => {
    let newFilteredData = [...data];

    if (filterAge) {
      newFilteredData = newFilteredData.filter(({ age }) => age === filterAge);
    }

    if (filterSalaryMin) {
      newFilteredData = newFilteredData.filter(
        ({ salary }) => salary >= filterSalaryMin,
      );
    }

    if (filterSalaryMax) {
      newFilteredData = newFilteredData.filter(
        ({ salary }) => salary <= filterSalaryMax,
      );
    }

    if (filterNameAndEmail) {
      newFilteredData = newFilteredData.filter(({ name, email }) => {
        const filterText = filterNameAndEmail.toUpperCase();

        const isNameMatch = name?.toUpperCase().includes(filterText);
        const isEmailMatch = email?.toUpperCase().includes(filterText);

        return isNameMatch || isEmailMatch;
      });
    }

    /* Se hace un reverse debido a que el fake server
    siempre agrega los nuevos elementos en la última página */
    setFilteredData(newFilteredData.reverse());
  }, [data, filterNameAndEmail, filterAge, filterSalaryMin, filterSalaryMax]);

  const getData = useCallback(async () => {
    setLoading(true);

    try {
      const res = await api.getEmployees();

      setData(res);
      filterData();
    } catch (error) {
      notification.error({
        message: 'Error del servidor',
        description: 'Error al gargar los empleados',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteEmployee = useCallback(
    async (id) => {
      setLoading(true);
      try {
        await api.deleteEmployee(id);

        getData();
      } catch (error) {
        setLoading(false);
        notification.error({
          message: 'Error del servidor',
          description: 'Error al eliminar al empleado',
        });
      }
    },
    [getData],
  );

  const closeModal = useCallback(
    (update) => {
      if (update) {
        getData();
      }

      setShowFormModal(false);
      setSelectedEmployee(null);
    },
    [getData],
  );

  const openEmployee = useCallback((record) => {
    setSelectedEmployee(record);
    setShowFormModal(true);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    filterData();
  }, [data, filterNameAndEmail, filterAge, filterSalaryMin, filterSalaryMax]);

  return (
    <AdminLayout>
      <div className="employees-list">
        <Input
          size="large"
          placeholder="Buscar..."
          value={filterNameAndEmail}
          onChange={(e) => setFilterNameAndEmail(e.target.value)}
          prefix={<img src={searchIcon} alt="" />}
        />

        <Button
          className="employees-list__filter-btn"
          type="link"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? '- ' : '+ '}
          Filtros
        </Button>

        {showFilters && (
          <div className="employees-list__filters">
            <InputNumber
              min={0}
              max={filterSalaryMax}
              value={filterSalaryMin}
              onChange={(value) => setFilterSalaryMin(value)}
              addonBefore="Salario mínimo"
            />

            <InputNumber
              min={filterSalaryMin}
              value={filterSalaryMax}
              onChange={(value) => setFilterSalaryMax(value)}
              addonBefore="Salario máximo"
            />

            <InputNumber
              min={0}
              value={filterAge}
              onChange={(value) => setFilterAge(value)}
              addonBefore="Edad"
            />
          </div>
        )}
      </div>

      <Button
        className="employees-list__add-btn btn-yellow"
        onClick={() => setShowFormModal(true)}
      >
        <img src={addUserIcon} alt="" />
        Nuevo empleado
      </Button>

      <EmployeesTable
        dataSource={filteredData}
        loading={loading}
        openEmployee={openEmployee}
        deleteEmployee={deleteEmployee}
      />

      <EmployeeForm
        visible={showFormModal}
        closeModal={closeModal}
        selectedEmployee={selectedEmployee}
      />
    </AdminLayout>
  );
}

export default EmployeesPage;
