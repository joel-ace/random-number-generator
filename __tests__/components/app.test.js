import React from 'react';
import { mount } from 'enzyme';
import App from '../../src/components/App.jsx';

describe('App component', () => {
  it('should mount', () => {
    mount(<App />);
  });
});
