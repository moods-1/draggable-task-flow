import React from 'react';
import { Input } from 'reactstrap';

const ChartDropDown = ({ selectOptions, changeFunction, defaultValue }) => {
	return (
		<Input
			type='select'
			className='shadow-none'
			defaultValue={defaultValue}
			onChange={changeFunction}
		>
			{selectOptions.map((c) => (
				<option key={c.label} name={c.label} value={`${c.value},${c.label}`}>
					{c.label}
				</option>
			))}
		</Input>
	);
};

export default ChartDropDown;
