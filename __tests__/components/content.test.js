import React from 'react';
import { mount } from 'enzyme';
import Content from '../../src/components/Content.jsx';

const QUANTITY = 3;

describe('Content component', () => {
	const contentComponent = mount(<Content />);

	const button = contentComponent.find('button.generate-number-button');
	const input = contentComponent.find('input.input-number-quantity');

	const handleGeneratePhoneNumbersSpy = jest.spyOn(contentComponent.instance(), 'handleGeneratePhoneNumbers');
  const handleQuantityChangeSpy = jest.spyOn(contentComponent.instance(), 'handleQuantityChange');
	const renderErrorMessageSpy = jest.spyOn(contentComponent.instance(), 'renderErrorMessage');
	const handlePageClickSpy = jest.spyOn(contentComponent.instance(), 'handlePageClick');
	const sortNumbersSpy = jest.spyOn(contentComponent.instance(), 'sortNumbers');

	contentComponent.update();
	contentComponent.instance().forceUpdate();

  it('should call handleGeneratePhoneNumber function when the generate button is clicked', () => {
		button.simulate('click');
    expect(handleGeneratePhoneNumbersSpy).toHaveBeenCalled();
	});

  it('should call handleQuantityChange function when the quantity of numbers to be generated is changed', () => {
		input.simulate('change', { target: { value: QUANTITY } });
    expect(handleQuantityChangeSpy).toHaveBeenCalled();
	});

	it('should return a false value for handleQuantityChange function when the quantity of numbers is 0', () => {
		const quantityChange = contentComponent.instance().handleQuantityChange({ target: { value: 0 } });
    expect(quantityChange).toBe(false);
	});

	it('should call handlePageClick function when the pagination page link is clicked', (done) => {
		contentComponent.setState({ quantity: 100 });
		button.simulate('click');

		const paginationNextButton = contentComponent.find('ul.pagination > li.next a');
		paginationNextButton.simulate('click');

		setImmediate(() => {
			expect(handlePageClickSpy).toHaveBeenCalled();
			done();
		});
	});

	it('should call sortNumbers function when the asc or desc buttons are clicked', (done) => {
		const sortButton = contentComponent.find('button.sort-asc');
		sortButton.simulate('click');

		setImmediate(() => {
			expect(sortNumbersSpy).toHaveBeenCalled();
			done();
		});
	});

	it('should properly sort the numbers when the asc or desc buttons are clicked', (done) => {
		const descSortButton = contentComponent.find('button.sort-desc');
		descSortButton.simulate('click');

		const phoneNumbers = contentComponent.state('paginationData').data;
		const phoneNumberCount = phoneNumbers.length - 1;

		setImmediate(() => {
			expect(parseInt(phoneNumbers[phoneNumberCount], 10)).toBeLessThan(parseInt(phoneNumbers[phoneNumberCount - 2], 10));
			done();
		});
	});

  it('should display an error message if quantity entered is less than 1 or more than 10000 is entered', (done) => {
		contentComponent.setState({ quantity: 0 });
		button.simulate('click');

		const errorDiv = contentComponent.find('.alert-danger');

		setImmediate(() => {
			expect(errorDiv.text()).toBe('Please enter a number between 1 and 10000');
			expect(renderErrorMessageSpy).toHaveBeenCalled();
			expect(contentComponent.state('error')).toBe('Please enter a number between 1 and 10000');
			done();
		});
	});
});
