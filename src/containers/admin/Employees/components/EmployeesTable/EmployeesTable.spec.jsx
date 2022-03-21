import React from 'react';
import { shallow, mount } from 'enzyme';
import EnzymeToJson from 'enzyme-to-json';
import EmployeesTable from './EmployeesTable';

it('The snapshot matches', () => {
  const tree = EnzymeToJson(
    mount(
      <EmployeesTable
        dataSource={[]}
        loading={false}
        openEmployee={() => {}}
        deleteEmployee={() => {}}
      />,
    ),
  );
  expect(tree).toMatchSnapshot();
});

it('renders without crashing', () => {
  shallow(
    <EmployeesTable
      dataSource={[]}
      loading={false}
      openEmployee={() => {}}
      deleteEmployee={() => {}}
    />,
  );
});
