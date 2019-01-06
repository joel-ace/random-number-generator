import React from 'react';

const DisplayGeneratedNumbers = ({ phoneNumbers }) => (
	<table className="table table-condensed">
		<thead>
			<tr className="info">
				<th style={{ width: 50 }}>S/N</th>
				<th>Number</th>
			</tr>
		</thead>
		<tbody>
			{
				phoneNumbers.map((number, index) => (
					<tr key={number}>
						<th style={{ width: 50 }}>{index + 1}</th>
						<td>{number}</td>
					</tr>
				))
			}
		</tbody>
	</table>
);

export default DisplayGeneratedNumbers;
