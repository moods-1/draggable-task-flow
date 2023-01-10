import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { MoreVert } from '@material-ui/icons';
import { TASK_LIST_PRIORITY, TASK_NUMBER_COLORS } from '../helpers/constants';
import useStyles from '../styles/TasksStyles';

function DraggableItem({ item, index, handleMore, setShowTaskModal }) {
	const classes = useStyles();
	return (
		<Draggable key={item.id} draggableId={item.id} index={index}>
			{/* eslint-disable-next-line no-shadow */}
			{(provided) => (
				<div
					role='presentation'
					className={`${classes.dragItem} ${TASK_LIST_PRIORITY[item.priority]}`}
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<div>
						<div className='task-header mb-4'>
							<p
								style={{
									color: TASK_NUMBER_COLORS[item.priority],
								}}
							>
								{index + 1}
							</p>
							<p>{item?.taskTitle}</p>
							<MoreVert
								role='presentation'
								onClick={() => {
									handleMore(item.id);
									setShowTaskModal(true);
								}}
							/>
						</div>
						<img
							className={classes.profile}
							src={item.assignee.image}
							alt={item.assignee.firstName}
						/>
					</div>
				</div>
			)}
		</Draggable>
	);
}

export default DraggableItem;
