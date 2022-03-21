import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import GenerateRoutes from './index';
import { AuthenticatedProvider } from '../AuthenticatedContext';

const demoRoutes = [
  {
    path: '/',
    exact: true,
    component: () => <div />,
    isPrivate: true,
    name: 'Admin',
  },
  {
    path: '/employees',
    isPrivate: true,
    component: () => <div />,
    name: 'Employees',
  },
];

it('The snapshot matches', () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <AuthenticatedProvider>
          <GenerateRoutes routes={demoRoutes} />
        </AuthenticatedProvider>
      </MemoryRouter>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders without crashing', () => {
  shallow(
    <AuthenticatedProvider>
      <GenerateRoutes routes={demoRoutes} />
    </AuthenticatedProvider>,
  );
});
