import React from 'react';
import { shallow } from 'enzyme';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { AuthenticatedProvider } from 'components/AuthenticatedContext';
import Login from './index';

it('The snapshot matches', () => {
  const history = createMemoryHistory();

  const tree = renderer
    .create(
      <Router location="/login" navigator={history}>
        <AuthenticatedProvider>
          <Login />
        </AuthenticatedProvider>
      </Router>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders without crashing', () => {
  shallow(<Login />);
});
