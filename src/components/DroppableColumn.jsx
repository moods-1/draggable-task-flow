import React from 'react';
import { Card } from 'reactstrap';
import { Typography } from '@mui/material';
import { Droppable } from 'react-beautiful-dnd';
import DraggableItem from './DraggableItem';

function DroppableColumn({
	columnId,
	data,
	handleMore,
	setShowTaskModal,
	title,
}) {
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
		return <p className='droppable-column-head-qty'>{text}</p>;
	};

	return (
		<Card className='droppable-column'>
			<div className='droppable-column-head'>
				<Typography textAlign={'center'} variant='body1'>
					{title}
				</Typography>
				<Quantity />
			</div>
			<Droppable droppableId={columnId}>
				{(provided) => (
					<div
						className='droppable-column-div'
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						{data.map((item, index) => (
							<DraggableItem
								key={item.id}
								item={item}
								index={index}
								handleMore={handleMore}
								setShowTaskModal={setShowTaskModal}
							/>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</Card>
	);
}

export default DroppableColumn;
