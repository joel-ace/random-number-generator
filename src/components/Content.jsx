import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import saveAs from 'file-saver';

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

const metaDataSpan = {
	margin: '0 20px 0 0',
	fontSize: '1.2em',
};

class Content extends Component {
	state = {
		phoneNumbers: [],
		quantity: 1,
		error: '',
		paginationData: defaultPaginationData,
		minNumber: '',
		maxNumber: '',
	};

	handleGeneratePhoneNumbers = (quantity) => {
		if (quantity > 0 && quantity <= GENERATE_NUMBER_LIMIT) {
			const generatedPhoneNumbers = generateNumbers(quantity);
			return this.setState({
				phoneNumbers: generatedPhoneNumbers,
				error: '',
				paginationData: paginate(PAGINATION_LIMIT, 1, generatedPhoneNumbers),
				minNumber: Math.min(...generatedPhoneNumbers),
				maxNumber: Math.max(...generatedPhoneNumbers)
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
		const { paginationData: { page } } = this.state;

		return (phoneNumbers.length > 0) &&
			<DisplayGeneratedNumbers
				paginationLimit={PAGINATION_LIMIT}
				page={parseInt(page, 10)}
				phoneNumbers={phoneNumbers} />
	};

	sortNumbers = (numberArray, order) => {
		const { paginationData: { page } } = this.state;
		let phoneNumbers;

		if (order === 'asc') {
			phoneNumbers = numberArray.sort((a, b) => a - b);
		} else {
			phoneNumbers = numberArray.sort((a, b) => b - a);
		}

		const paginationData = paginate(PAGINATION_LIMIT, page, phoneNumbers);

		this.setState({
			phoneNumbers,
			paginationData,
		});
	};

	saveNumbers = (numberArray) => {
		saveAs(
			new Blob([numberArray], {
				type: 'text/csv;charset=utf-8'
			}),
			'phoneNumbers.csv'
		);
	};

	render () {
		const {
			quantity,
			paginationData: { data: phoneNumbers, pageCount, totalCount },
			phoneNumbers: statePhoneNumbers,
			minNumber,
			maxNumber
		} = this.state;

		return (
			<div className="container">
				<div className="row">
					<div className="col-md-6 col-md-offset-3">
						<div className="panel panel-default">
							<div className="panel-heading"><h4>Enter the quantity of phone numbers to generate</h4></div>
							<div className="panel-body">
								{ this.renderErrorMessage() }
								<GenerateNumberForm
									generatePhoneNumbers={this.handleGeneratePhoneNumbers}
									quantity={quantity}
									handleQuantityChange={this.handleQuantityChange}
								/>
							</div>
						</div>
						{
							(phoneNumbers.length > 0) && (
								<div className="panel panel-default">
									<div className="panel-heading">
										<div className="controls">
										<div className="pull-left">
												<span>Sort Numbers: </span>
												<button
													className="btn btn-primary btn-sm sort-asc"
													style={{margin: '0 10px 0 0'}}
													onClick={() => this.sortNumbers(statePhoneNumbers, 'asc')} > asc
												</button>
												<button
													className="btn btn-primary btn-sm sort-desc"
													onClick={() => this.sortNumbers(statePhoneNumbers, 'desc')}> desc
												</button>
											</div>
											<div className="pull-right">
												<button
													className="btn btn-primary btn-sm save-num"
													onClick={() => this.saveNumbers(statePhoneNumbers)} > Save as csv
												</button>
											</div>
											<div className="clearfix" />
										</div>
									</div>
									<div className="panel-body">
										<div style={{ padding: 20, textAlign: 'center' }}>
											<span style={metaDataSpan}>
												<span className="label label-md label-primary">Min:</span> {`0${minNumber}`}
											</span>
											<span style={metaDataSpan}>
												<span className="label label-primary">Max:</span> {`0${maxNumber}`}
											</span>
											<span style={metaDataSpan}>
												<span className="label label-primary">Total:</span> {totalCount}
											</span>
										</div>
										{ this.renderGeneratedNumbers(phoneNumbers) }
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
									</div>
								</div>
							)
						}
					</div>
				</div>
			</div>
		);
	};
};

export default Content;
