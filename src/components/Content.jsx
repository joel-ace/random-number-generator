import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';

import GenerateNumberForm from './GenerateNumberForm';
import { generateNumbers, paginate } from '../utils';
import DisplayGeneratedNumbers from './DisplayGeneratedNumbers';

const GENERATE_NUMBER_LIMIT = 10000;
const PAGINATION_LIMIT = 20;

const defaultPaginationData = {
	data: [],
	totalCount: 0,
	pageCount: 0,
};

class Content extends Component {
	state = {
		phoneNumbers: [],
		quantity: 1,
		error: '',
		paginationData: defaultPaginationData,
	};

	handleGeneratePhoneNumbers = (quantity) => {
		if (quantity > 0 && quantity <= GENERATE_NUMBER_LIMIT) {
			const generatedPhoneNumbers = generateNumbers(quantity);
			return this.setState({
				phoneNumbers: generatedPhoneNumbers,
				error: '',
				paginationData: paginate(PAGINATION_LIMIT, 1, generatedPhoneNumbers),
			});
		};

		return this.setState({
			phoneNumbers: [],
			error: `Please enter a number between 1 and ${GENERATE_NUMBER_LIMIT}`,
			paginationData: defaultPaginationData,
		});
	};

	handleQuantityChange = (event) => {
		const { target: { value: quantity } } = event;

		if (!quantity) {
			return false;
		}

		this.setState({
			quantity: parseInt(quantity, 10),
		});
	};

	handlePageClick = (data) => {
		const { selected } = data;
		const { phoneNumbers } = this.state;

		const paginationData = paginate(PAGINATION_LIMIT, parseInt(selected + 1, 10), phoneNumbers);
		this.setState({
			paginationData,
		});

	};

	renderErrorMessage = () => {
		const { error } = this.state;
		return error && <div className="alert alert-danger">{error}</div>;
	};

	renderGeneratedNumbers = (phoneNumbers) => {
		return (phoneNumbers.length > 0) && <DisplayGeneratedNumbers phoneNumbers={phoneNumbers} />
	};

	render () {
		const { quantity, paginationData: { data: phoneNumbers, pageCount } } = this.state;

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
						{
							(phoneNumbers.length > 0) &&
							<ReactPaginate previousLabel={"previous"}
								nextLabel={"next"}
								breakLabel={"..."}
								breakClassName={"break-me"}
								pageCount={pageCount}
								marginPagesDisplayed={2}
								pageRangeDisplayed={5}
								onPageChange={this.handlePageClick}
								containerClassName={"pagination"}
								subContainerClassName={"pages pagination"}
								activeClassName={"active"} />
						}
					</div>
				</div>
			</div>
		);
	};
};

export default Content;
