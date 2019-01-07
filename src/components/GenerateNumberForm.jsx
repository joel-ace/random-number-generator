import React from 'react';

const GenerateNumberForm = ({ generatePhoneNumbers, quantity, handleQuantityChange }) => (
	<div className="form-inline">
		<div style={{ margin: '20px auto', textAlign: 'center' }}>
			<div className="form-group" style={{ marginRight: 20 }}>
				<input type="number" min={1} max={10000} onChange={handleQuantityChange} value={quantity} className="form-control input-number-quantity"/>
			</div>
			<button onClick={() => generatePhoneNumbers(quantity)} type="button" className="btn btn-primary generate-number-button">Generate numbers</button>
		</div>
	</div>
);

export default GenerateNumberForm;
