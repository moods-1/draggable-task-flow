import { useState, useContext } from 'react';
import { Row } from 'reactstrap';
import { DragDropContext } from 'react-beautiful-dnd';
import { TaskContext } from '../context/taskContext';
import TaskModal from './Modals/TaskModal';
import DroppableColumn from './DroppableColumn';
import Statistics from './Statistics';
import ContentHeader from './ContentHeader';
import useStyles from '../styles/TasksStyles';

function Tasks() {
	const classes = useStyles();
	const [currentTask, setCurrentTask] = useState({});
	const [showTaskModal, setShowTaskModal] = useState(false);
	const [taskType, setTaskType] = useState('edit');
	const { tasks, setTasks, columns, handleColumns } = useContext(TaskContext);

	const onDragEnd = (result) => {
		const { destination, source } = result;
		if (!destination) {
			return null;
		}
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		)
			return null;

		const start = columns[source.droppableId];
		const finish = columns[destination.droppableId];
		const sourceTasks = [...start.taskIds];
		const destinationTasks = [...finish.taskIds];
		let localColumns = { ...columns };

		if (start === finish) {
			// Same column
			const [reorderedItem] = sourceTasks.splice(source.index, 1);
			sourceTasks.splice(destination.index, 0, reorderedItem);
			start.taskIds = [...sourceTasks];
			localColumns[source.droppableId] = start;
			handleColumns(localColumns, 'edit');
		} else {
			// Different column
			const [sourceId] = sourceTasks.splice(source.index, 1);
			finish.taskIds = destinationTasks.splice(destination.index, 0, sourceId);
			const newStart = { ...start, taskIds: sourceTasks };
			const newFinish = { ...finish, taskIds: destinationTasks };
			localColumns = {
				...localColumns,
				[start.id]: newStart,
				[finish.id]: newFinish,
			};
			handleColumns(localColumns, 'edit');
			const localTasks = { ...tasks };
			const newTitle = finish.title;
			localTasks[sourceId].state = newTitle;
			setTasks({ ...tasks });
		}
	};

	const handleDelete = (id) => {
		const localTasks = { ...tasks };
		const targetColumn = Object.values(columns).find((col) =>
			col.taskIds.includes(id)
		);
		targetColumn.taskIds = targetColumn.taskIds.filter((task) => task !== id);
		delete localTasks[id];
		handleColumns({ [targetColumn.id]: targetColumn }, 'edit');
		setTasks({ ...localTasks });
		setShowTaskModal((prevState) => !prevState);
	};

	const handleMore = (id) => {
		const localTask = Object.values(tasks).find((i) => i.id === id);
		if (currentTask.id !== id) {
			setTaskType('edit');
			setCurrentTask(localTask);
		}
	};

	const handleSave = (task) => {
		const { id } = task;
		const items = { ...tasks };
		items[id] = task;
		setTasks({ ...items });
		setShowTaskModal(!showTaskModal);
		setCurrentTask({});
	};

	const handleNewTaskButton = () => {
		setTaskType('new');
		setCurrentTask({});
		setShowTaskModal(true);
	};

	return (
		<div className={classes.taskMain}>
			<ContentHeader
				title='Tasks'
				subtitle='Track your workflow'
				showButton
				buttonColor='secondary'
				buttonText='+ New Task'
				buttonFunction={handleNewTaskButton}
			/>
			<div>
				<Statistics />
			</div>
			<DragDropContext onDragEnd={onDragEnd}>
				<Row className={classes.taskContent}>
					{Object.values(columns).map(({ id, taskIds, title }) => {
						const localTasks = taskIds.map((taskId) => tasks[taskId]);
						return (
							<DroppableColumn
								key={id}
								columnId={id}
								title={title}
								data={localTasks}
								handleMore={handleMore}
								setShowTaskModal={setShowTaskModal}
							/>
						);
					})}
				</Row>
			</DragDropContext>
			{showTaskModal && (
				<TaskModal
					open={showTaskModal}
					toggle={() => setShowTaskModal(!showTaskModal)}
					currentTask={currentTask}
					setCurrentTask={setCurrentTask}
					handleEditSave={handleSave}
					handleDelete={handleDelete}
					taskType={taskType}
				/>
			)}
		</div>
	);
}

export default Tasks;
