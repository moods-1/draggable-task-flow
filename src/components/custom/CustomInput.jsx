import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { CancelRounded } from '@material-ui/icons';
import { Input } from 'reactstrap';

const useStyles = makeStyles(() => ({
	searchBox: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		position: 'relative',
		'& svg': {
			fontSize: 22,
		},
	},
	controlDiv: {
		width: '30px',
		height: '93%',
		position: 'absolute',
		right: 1,
		backgroundColor: '#FFF',
		borderRadius: '0px 4px 4px 0px',
	},
	cancel: {
		color: 'gray',
		cursor: 'pointer',
	},
}));

function SearchInput(props) {
	const classes = useStyles();
	const {
		placeHolder,
		changeFunction,
		inputWidth,
		resetSearch,
		inputFontSize,
		inputSize,
		inputType,
		lengthMax,
		lengthMin,
		required,
		sourceValue,
	} = props;
	const [localSearch, setLocalSearch] = useState(sourceValue);
	
	const clearSearch = () => {
		setLocalSearch('');
		changeFunction('');
	};

	useEffect(() => {
		if (resetSearch) {
			setLocalSearch('');
		}
	}, [resetSearch]);

	const mainStyle = {
		width: '100%',
		minWidth: 200,
		maxWidth: inputWidth || 260,
	};

	return (
		<div className={classes.searchBox} style={mainStyle}>
			<Input
				style={{ fontSize: inputFontSize || 14 }}
				type={inputType || 'text'}
				bsSize={inputSize || 'lg'}
				value={localSearch || ''}
				placeholder={placeHolder}
				required={required || false}
				maxLength={lengthMax}
				minLength={lengthMin}
				onChange={(e) => {
					setLocalSearch(e.target.value);
					changeFunction(e.target.value.toLowerCase());
				}}
			/>
			<div className={classes.controlDiv}>
				{localSearch && (
					<CancelRounded className={classes.cancel} onClick={clearSearch} />
				)}
			</div>
		</div>
	);
}

export default SearchInput;
