import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { Search, CancelRounded } from '@material-ui/icons';
import { Input } from 'reactstrap';

const useStyles = makeStyles((theme) => ({
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
	search: {
		color: theme.palette.primary.main,
	},
	cancel: {
		color: 'gray',
		cursor: 'pointer',
	},
}));

function SearchInput(props) {
	const classes = useStyles();
	const [localSearch, setLocalSearch] = useState('');
	const {
		placeHolder,
		changeFunction,
		inputWidth,
		resetSearch,
		inputFontSize,
		inputSize,
	} = props;

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
				type='text'
				bsSize={inputSize || 'lg'}
				value={localSearch}
				placeholder={placeHolder}
				onChange={(e) => {
					setLocalSearch(e.target.value);
					changeFunction(e.target.value.toLowerCase());
				}}
			/>
			<div className={classes.controlDiv}>
				{localSearch ? (
					<CancelRounded className={classes.cancel} onClick={clearSearch} />
				) : (
					<Search className={classes.search} />
				)}
			</div>
		</div>
	);
}

export default SearchInput;
