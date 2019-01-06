import React from 'react';
import { mount } from 'enzyme';
import Content from '../../src/components/Content.jsx';

const QUANTITY = 3;

describe('Content component', () => {
	const contentComponent = mount(<Content />);
  const handleGeneratePhoneNumbersSpy = jest.spyOn(contentComponent.instance(), 'handleGeneratePhoneNumbers');
  const handleQuantityChangeSpy = jest.spyOn(contentComponent.instance(), 'handleQuantityChange');
	const renderErrorMessageSpy = jest.spyOn(contentComponent.instance(), 'renderErrorMessage');

	contentComponent.update();
	contentComponent.instance().forceUpdate();

	const button = contentComponent.find('button.generate-number-button');
	const input = contentComponent.find('input.input-number-quantity');
	const errorDiv = contentComponent.find('div.alert-danger');

  it('should call handleGeneratePhoneNumber function when the generate button is clicked', () => {
		button.simulate('click');
    expect(handleGeneratePhoneNumbersSpy).toHaveBeenCalled();
	});

  it('should call handleQuantityChange function when the quantity of numbers to be generated is changed', () => {
		input.simulate('change', { target: { value: QUANTITY } });
    expect(handleQuantityChangeSpy).toHaveBeenCalled();
	});

  xit('should display an error message if quantity entered is less than 1 or more than 10000 is entered', (done) => {
		input.simulate('change', { target: { value: 0 } });
		contentComponent.update();
		contentComponent.instance().forceUpdate();

		setImmediate(() => {
			expect(renderErrorMessageSpy).toHaveBeenCalled();
			expect(contentComponent.state('error')).toBe('Please enter a number between 1 and 10000');
			expect(errorDiv.length).toBe(1);
			done();
		});
	});
});
