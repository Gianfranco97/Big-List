import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { AuthenticatedProvider } from 'components/AuthenticatedContext';
import Forgot from './index';

it('The snapshot matches', () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <AuthenticatedProvider>
          <Forgot />
        </AuthenticatedProvider>
      </MemoryRouter>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders without crashing', () => {
  shallow(<Forgot />);
});
