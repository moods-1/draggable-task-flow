import React from 'react';
import { TextField } from '@mui/material';

function ModalTextField({ label, value, onChange, inputProps, type }) {
	return (
		<TextField
			label={label || ''}
			size='small'
			type={type || 'text'}
			variant='standard'
			fullWidth
			onChange={onChange}
			inputProps={inputProps}
			required
			value={value || ''}
		/>
	);
}

export default ModalTextField;
