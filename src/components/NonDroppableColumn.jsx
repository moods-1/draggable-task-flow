import React from 'react';
import { Card } from 'reactstrap';
import { Typography } from '@mui/material';
import NonDraggableItem from './NonDraggableItem';

function NonDroppableColumn({ data, handleMore, setShowTaskModal, title }) {
	const Quantity = () => {
		const quantity = data.length;
		let text = quantity;
		if (quantity > 99) {
			text = (
				<span>
					99<sup>+</sup>
				</span>
			);
		}
		return <p className='droppable-column-head-qty bg-danger'>{text}</p>;
	};

	return (
		<Card className='droppable-column'>
			<div className='droppable-column-head'>
				<Typography textAlign={'center'} variant='body1'>
					{title}
				</Typography>
				<Quantity />
			</div>
			<div className={`droppable-column-div`}>
				{data.map((item, index) => {
					if (item) {
						return (
							<NonDraggableItem
								key={item._id}
								item={item}
								index={index}
								handleMore={handleMore}
								setShowTaskModal={setShowTaskModal}
							/>
						);
					} else return null;
				})}
			</div>
		</Card>
	);
}

export default NonDroppableColumn;
