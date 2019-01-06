import React from 'react';
import { mount } from 'enzyme';
import GenerateNumberForm from '../../src/components/GenerateNumberForm.jsx';

const props = {
  generatePhoneNumbers: jest.fn(),
  quantity: 1,
  handleQuantityChange: jest.fn(),
};

describe('GenerateNumberForm component', () => {
	const generateFormComponent = mount(<GenerateNumberForm {...props} />);
	const button = generateFormComponent.find('button.generate-number-button');

  it('should have a generate number button', () => {
    expect(button.length).toBe(1);
	});

	it('should call the generatePhoneNumbers function when the generate button is clicked', () => {
		button.simulate('click');
		expect(props.generatePhoneNumbers).toHaveBeenCalled();
  });
});
