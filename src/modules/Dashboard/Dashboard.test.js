import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Dashboard from './';

it('renders Dashboard without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Dashboard />, div);
  ReactDOM.unmountComponentAtNode(div);
});


it('Dashboard snapshot test', () => {

  const component = renderer.create(
    <Dashboard />,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
