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
				{(provided, snapshot) => (
					<div
						className={`droppable-column-div ${
							snapshot.isDraggingOver ? 'dragging-over' : ''
						}`}
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						{data.map((item, index) => {
							if (item) {
								return (
									<DraggableItem
										key={item._id}
										item={item}
										index={index}
										columnId={columnId}
										handleMore={handleMore}
										setShowTaskModal={setShowTaskModal}
									/>
								);
							} else return null;
						})}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</Card>
	);
}

export default DroppableColumn;
