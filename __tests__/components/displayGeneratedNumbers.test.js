import React from 'react';
import { mount } from 'enzyme';
import DisplayGeneratedNumbers from '../../src/components/DisplayGeneratedNumbers.jsx';
import { generateNumbers } from '../../src/utils';

const QUANTITY = 3;

const props = {
	phoneNumbers: generateNumbers(QUANTITY),
	page: 1,
};

describe('DisplayGeneratedNumbers component', () => {
	const displayGenerateNumberComponent = mount(<DisplayGeneratedNumbers {...props} />);
	const button = displayGenerateNumberComponent.find('table.table');

  it('should contain a table with a class of table', () => {
    expect(button.length).toBe(1);
	});
});
