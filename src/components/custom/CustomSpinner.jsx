import React from 'react';
import { Spinner } from 'reactstrap';

function CustomSpinner({ height, color }) {
	const SpinnerStyle = {
		display: 'grid',
		placeItems: 'center',
		width: '100%',
		minHeight: height || 200,
	};
	return (
		<div style={SpinnerStyle}>
			<Spinner color={color} />
		</div>
	);
}

export default CustomSpinner;
