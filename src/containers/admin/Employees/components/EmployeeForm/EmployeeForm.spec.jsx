import React from 'react';
import { shallow, mount } from 'enzyme';
import EnzymeToJson from 'enzyme-to-json';
import EmployeeForm from './EmployeeForm';

it('The snapshot matches', () => {
  const tree = EnzymeToJson(
    mount(<EmployeeForm closeModal={() => {}} visible />),
  );
  expect(tree).toMatchSnapshot();
});

it('renders without crashing', () => {
  shallow(<EmployeeForm closeModal={() => {}} visible />);
});
