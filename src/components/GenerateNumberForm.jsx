import React from 'react';

const GenerateNumberForm = ({ generatePhoneNumbers, quantity, handleQuantityChange }) => (
	<form className="form-inline">
		<div style={{ margin: '20px auto', textAlign: 'center' }}>
			<h4 style={{ marginBottom: 20 }}>Enter the quantity of phone numbers to generate</h4>
			<div className="form-group" style={{ marginRight: 20 }}>
				<input type="number" min={1} max={10000} onChange={handleQuantityChange} value={quantity} className="form-control input-number-quantity"/>
			</div>
			<button onClick={() => generatePhoneNumbers(quantity)} type="button" className="btn btn-primary generate-number-button">Generate numbers</button>
		</div>
	</form>
);

export default GenerateNumberForm;
