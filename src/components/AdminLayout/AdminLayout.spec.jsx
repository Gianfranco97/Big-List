import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import AdminLayout from './index';
import { AuthenticatedProvider } from '../AuthenticatedContext';

it('The snapshot matches', () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <AuthenticatedProvider>
          <AdminLayout>
            <div />
          </AdminLayout>
        </AuthenticatedProvider>
      </MemoryRouter>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders without crashing', () => {
  shallow(
    <AdminLayout>
      <div />
    </AdminLayout>,
  );
});
