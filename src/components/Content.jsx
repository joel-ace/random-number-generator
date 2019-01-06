import React, { Component } from 'react';

import GenerateNumberForm from './GenerateNumberForm';
import { generateNumbers } from '../utils';
import DisplayGeneratedNumbers from './DisplayGeneratedNumbers';

const GENERATE_NUMBER_LIMIT = 10000;

class Content extends Component {
	state = {
		phoneNumbers: [],
		quantity: 1,
		error: '',
	}

	handleGeneratePhoneNumbers = (quantity) => {
		if (quantity > 0 && quantity <= GENERATE_NUMBER_LIMIT) {
			const generatedPhoneNumbers = generateNumbers(quantity);
			return this.setState({
				phoneNumbers: generatedPhoneNumbers,
				error: '',
			});
		};

		return this.setState({
			phoneNumbers: [],
			error: `Please enter a number between 1 and ${GENERATE_NUMBER_LIMIT}`,
		});

	};

	handleQuantityChange = (event) => {
		const { target: { value: quantity } } = event;
		this.setState({
			quantity,
		});
	};

	renderErrorMessage = () => {
		const { error } = this.state;
		return error && <div className="alert alert-danger">{error}</div>;
	}

	renderGeneratedNumbers = (phoneNumbers) => {
		return (phoneNumbers.length > 0) && <DisplayGeneratedNumbers phoneNumbers={phoneNumbers} />
	}

	render () {
		const { quantity, phoneNumbers } = this.state;

		return (
			<div className="container">
				<div className="row">
					<div className="col-md-6 col-md-offset-3">
						<GenerateNumberForm
							generatePhoneNumbers={this.handleGeneratePhoneNumbers}
							quantity={quantity}
							handleQuantityChange={this.handleQuantityChange}
						/>
						{ this.renderErrorMessage() }
						{ this.renderGeneratedNumbers(phoneNumbers) }
					</div>
				</div>
			</div>
		);
	};
};

export default Content;
