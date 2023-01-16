import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TableRowLoading from './TableRowLoading';

const useStyles = makeStyles((theme) => ({
	tableDiv: {
		overflow: 'auto',
		height: 'auto',
		'&::-webkit-scrollbar': {
			width: '10px',
		},
		'&::-webkit-scrollbar-track': {
			background: '#FFF',
			borderRadius: '0px',
		},
		'&::-webkit-scrollbar-thumb': {
			borderRadius: '0px',
			border: '2px solid #FFF',
			backgroundColor: theme.palette.background.light,
			minHeight: 80,
		},
	},
	emptyCaption: {
		color: '#000',
		background: '#FFF',
		textAlign: 'center',
		width: '100%',
		minHeight: 100,
	},
	captionMessage: {
		color: '#000',
		padding: '50px 0px',
	},
}));

function CustomDataTable({
	rows,
	columns,
	filterable,
	dataFilter,
	tableHeight,
	isLoading,
}) {
	const [filterableIndexes, setFilterableIndexes] = useState([]);
	const classes = useStyles();

	const filteredData = rows.filter((row) => {
		let value;
		let match = false;
		if (dataFilter) {
			for (let x of filterableIndexes) {
				if (String(row[x])?.toLowerCase().includes(dataFilter)) {
					match = true;
					break;
				}
			}
			if (match) {
				value = row;
			}
		} else {
			value = rows;
		}
		return value;
	});

	useEffect(() => {
		if (filterable) {
			let filterableArray = [];
			columns.forEach(
				(col) => col.filterable && filterableArray.push(col.field)
			);
			setFilterableIndexes(filterableArray);
		}
	}, [columns, filterable]);

	const main = {
		maxHeight: tableHeight || 200,
	};
	const CaptionMessage = () => {
		return (
			<div className={classes.captionMessage}>
				<h3>It's Empty</h3>
				<p>
					Hmm... looks like there is no <br /> data to display.
				</p>
			</div>
		);
	};

	const showCaption = !rows.length && !isLoading;

	return (
		<div className={classes.tableDiv} style={main}>
			<table className='table'>
				<thead>
					<tr>
						{columns.map(({ label }) => (
							<td key={label}>{label}</td>
						))}
					</tr>
				</thead>
				{showCaption && (
					<caption className={classes.emptyCaption}>
						<CaptionMessage />
					</caption>
				)}
				<tbody>
					{filteredData.map((row, index) => (
						<tr key={index}>
							{columns.map(({ field }, index) => (
								<td key={field}>{row[field]}</td>
							))}
						</tr>
					))}
					{isLoading && (
						<>
							<TableRowLoading columns={columns} />
							<TableRowLoading columns={columns} />
						</>
					)}
				</tbody>
			</table>
		</div>
	);
}

export default CustomDataTable;
