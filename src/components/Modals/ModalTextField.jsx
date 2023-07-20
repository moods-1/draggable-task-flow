import React from 'react';
import { TextField } from '@mui/material';
import useStyles from '../../styles/AppStyles';

function ModalTextField({ label, value, onChange, inputProps, type, required, disabled }) {
	const classes = useStyles();
	return (
		<TextField
			label={label || ''}
			size='small'
			type={type || 'text'}
			variant='standard'
			fullWidth
			onChange={onChange}
			inputProps={inputProps}
			required={required}
			value={value || ''}
			disabled={disabled}
			className={classes.textField}
		/>
	);
}

export default ModalTextField;
