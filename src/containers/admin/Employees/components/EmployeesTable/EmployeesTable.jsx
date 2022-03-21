import React, { useMemo } from 'react';
import {
  Button, Pagination, Select, Table,
} from 'antd';
import PropTypes from 'prop-types';
import deleteIcon from 'assets/img/delete-icon.svg';
import viewIcon from 'assets/img/view-icon.svg';
import usePagination from 'hooks/usePagination';
import confirmDeleteEmployee from './confirmDeleteEmployee';
import './EmployeesTable.less';

function EmployeesTable({
  dataSource, loading, openEmployee, deleteEmployee,
}) {
  const {
    paginatedData, currentPage, setCurrentPage, pageSize, setPageSize,
  } = usePagination({
    data: dataSource,
    initialSize: 5,
  });

  const columns = useMemo(
    () => [
      {
        title: 'NOMBRE',
        dataIndex: 'name',
        render: (name) => name.toUpperCase(),
      },
      {
        title: 'EDAD',
        dataIndex: 'age',
      },
      {
        title: 'SALARIO',
        dataIndex: 'salary',
        render: (salary) => {
          if (salary) {
            const fotmatedSalary = Math.trunc(salary / 1000, 2);

            return `${fotmatedSalary}K`;
          }

          return '-';
        },
      },
      {
        title: 'EMAIL',
        dataIndex: 'email',
      },
      {
        title: 'ACCIONES',
        align: 'right',
        fixed: 'right',
        render: (_, record) => (
          <div className="my-list__actions">
            <Button
              icon={<img src={viewIcon} alt="Editar" />}
              onClick={() => openEmployee(record)}
            />

            <Button
              icon={<img src={deleteIcon} alt="Eliminar" />}
              danger
              onClick={() => confirmDeleteEmployee(record.name, record.id, deleteEmployee)}
            />
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <>
      <Table
        className="my-list"
        loading={loading}
        itemLayout="horizontal"
        dataSource={paginatedData}
        pagination={false}
        rowKey="id"
        columns={columns}
      />

      <div className="pagination-container">
        <Select value={pageSize} onChange={(value) => setPageSize(value)}>
          <Select.Option value={5}>5</Select.Option>
          <Select.Option value={10}>10</Select.Option>
          <Select.Option value={20}>20</Select.Option>
          <Select.Option value={50}>50</Select.Option>
          <Select.Option value={100}>100</Select.Option>
        </Select>

        <Pagination
          current={currentPage}
          onChange={setCurrentPage}
          pageSize={pageSize}
          total={dataSource.length}
          showSizeChanger={false}
        />
      </div>
    </>
  );
}

EmployeesTable.propTypes = {
  dataSource: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      email: PropTypes.string,
      age: PropTypes.number,
      salary: PropTypes.number,
    }),
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  openEmployee: PropTypes.func.isRequired,
  deleteEmployee: PropTypes.func.isRequired,
};

export default EmployeesTable;
