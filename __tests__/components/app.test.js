import React from 'react';
import { mount } from 'enzyme';
import App from '../../src/App.jsx';

describe('App', () => {
  it('should mount', () => {
    mount(<App />);
  });
});
