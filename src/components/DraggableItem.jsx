import React, { useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { MoreVert } from '@material-ui/icons';
import { TASK_LIST_PRIORITY, TASK_NUMBER_COLORS } from '../helpers/constants';
import { textTruncater } from '../helpers/helperFunctions';
import useStyles from '../styles/TasksStyles';
import { TaskContext } from '../context/taskContext';

function DraggableItem({ item, index, columnId, handleMore, setShowTaskModal }) {
	const classes = useStyles();
	const { users } = useContext(TaskContext);
	const { assignee: assigneeId, taskTitle } = item;
	const assignee = users.find((u) => u._id === assigneeId);
	if(!assignee) return null;
	const title = textTruncater(taskTitle, 30);

	return (
		<Draggable key={item._id} draggableId={item._id} index={index}>
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
							<p>{title}</p>
							<MoreVert
								role='presentation'
								onClick={() => {
									handleMore(item._id, columnId);
									setShowTaskModal(true);
								}}
							/>
						</div>
						<img
							className={classes.profile}
							src={assignee.image}
							alt={assignee.firstName}
						/>
					</div>
				</div>
			)}
		</Draggable>
	);
}

export default DraggableItem;
