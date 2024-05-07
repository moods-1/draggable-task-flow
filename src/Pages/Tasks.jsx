import { useState, useEffect, useContext } from 'react';
import { Row } from 'reactstrap';
import { DragDropContext } from 'react-beautiful-dnd';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

import { TaskContext } from '../context/taskContext';
import TaskModal from '../components/Modals/TaskModal';
import DroppableColumn from '../components/DroppableColumn';
import NonDroppableColumn from '../components/NonDroppableColumn';
import Statistics from '../components/Statistics';
import ContentHeader from '../components/ContentHeader';
import useStyles from '../styles/TasksStyles';
import { moveTaskSameColumn, moveTaskNewColumn } from '../api/columns';
import { deleteTask } from '../api/tasks';
import { CustomSpinner }  from '../components/custom/Loaders';
import StateFilters from '../components/StateFilters';

function Tasks({ snack }) {
	const classes = useStyles();
	const [currentTask, setCurrentTask] = useState({});
	const [currentColumn, setCurrentColumn] = useState(null);
	const [columnsToDisplay, setColumnsToDisplay] = useState([]);
	const [showTaskModal, setShowTaskModal] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [taskType, setTaskType] = useState('edit');
	const [filterObject, setFilterObject] = useState({});
	const [showFilters, setShowFilters] = useState(false);
	const { tasks, setTasks, tasksDue, columns, handleColumns, loggedInUser, isAdmin, handleHeaderText } =
		useContext(TaskContext);
	
	const filteredTasks = Object.values(tasks).filter(
		(t) => t.state in filterObject || !Object.keys(filterObject).length
	);

	const FilterButton = () => {
		return (
			<div className='mb-2 text-black'>
				<p
					role='button'
					style={{ display: 'flex', alignItems: 'center' }}
					onClick={() => setShowFilters(!showFilters)}
				>
					Filtering
					{showFilters ? <ExpandLess /> : <ExpandMore />}
				</p>
			</div>
		);
	};

	const onDragEnd = async (result) => {
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
		let localColumns = { ...columns };
		const [sourceTaskId] = start.taskIds.splice(source.index, 1);
		const localTasks = { ...tasks };
		const mover = {
			moverId: loggedInUser._id,
			moverName: `${loggedInUser.firstName} ${loggedInUser.lastName}`,
		};

		if (start === finish) {
			// Same column local update
			start.taskIds.splice(destination.index, 0, sourceTaskId);
			localColumns[source.droppableId] = start;
			handleColumns(localColumns, 'move task');
			// Same column database update
			const requestBody = {
				sourceTaskId,
				sourceIndex: source.index,
				destinationIndex: destination.index,
				destinationId: destination.droppableId,
				mover,
			};
			await moveTaskSameColumn(requestBody);
		} else {
			// Different column local update
			finish.taskIds.splice(destination.index, 0, sourceTaskId);
			localColumns = {
				...localColumns,
				[start._id]: start,
				[finish._id]: finish,
			};
			handleColumns(localColumns, 'move task');
			// Column: Database update
			const requestBody = {
				sourceTaskId,
				sourceIndex: source.index,
				sourceId: source.droppableId,
				destinationIndex: destination.index,
				destinationId: destination.droppableId,
				mover,
			};
			await moveTaskNewColumn(requestBody);
			const localTasks = { ...tasks };
			const newTitle = finish.title;
			localTasks[sourceTaskId].state = newTitle;
		}
		localTasks[sourceTaskId].lastMovedBy = { ...mover };
		setTasks({ ...localTasks });
	};

	const handleDelete = async (task) => {
		const { _id: id } = task;
		const requestBody = { ...task, columnId: currentColumn };
		const result = await deleteTask(requestBody);
		const { status, response } = result?.data;
		if (status === 200) {
			const localTasks = { ...tasks };
			const targetColumn = columns[currentColumn];
			targetColumn.taskIds = targetColumn.taskIds.filter((task) => task !== id);
			delete localTasks[id];
			handleColumns(
				{ colId: currentColumn, colData: targetColumn },
				'delete task'
			);
			setTasks({ ...localTasks });
			setShowTaskModal((prevState) => !prevState);
		} else {
			snack(response?.message, 'error');
		}
	};

	const handleMore = (taskId, columnId) => {
		const localTask = Object.values(tasks).find((i) => i._id === taskId);
		if (currentTask._id !== taskId) {
			setTaskType('edit');
			setCurrentColumn(columnId);
			setCurrentTask(localTask);
		}
	};

	const handleSave = (task) => {
		const { _id } = task;
		const items = { ...tasks };
		items[_id] = task;
		setTasks({ ...items });
		setShowTaskModal(!showTaskModal);
		setCurrentTask({});
	};

	const handleNewTaskButton = () => {
		setTaskType('new');
		setCurrentTask({});
		setShowTaskModal(true);
	};

	const handleFilterObject = (key, value) => {
		let localFilterObject = { ...filterObject };
		if (key in filterObject) {
			delete localFilterObject[key];
		} else {
			localFilterObject[key] = value;
		}
		setFilterObject({ ...localFilterObject });
	};

	useEffect(() => {
		const localCols = Object.values(columns);
		setColumnsToDisplay([...localCols]);
		setIsLoading(localCols.length < 1);
	}, [columns]);

	useEffect(() => {
		handleHeaderText({ title: 'Tasks', subtitle: 'Track Workflow' });
	}, [handleHeaderText]);

	return (
		<div className={classes.taskMain}>
			<ContentHeader
				title=''
				subtitle=''
				showButton
				disableButton={!isAdmin}
				buttonColor='secondary'
				buttonText='+ New Task'
				buttonFunction={handleNewTaskButton}
			/>
			<div>
				<FilterButton />
				<StateFilters
					filterObject={filterObject}
					handleFilterObject={handleFilterObject}
					showFilters={showFilters}
				/>
			</div>
			<div>
				<Statistics
					showFilters={showFilters}
					filterObject={filterObject}
					handleFilterObject={handleFilterObject}
				/>
			</div>
			<DragDropContext onDragEnd={onDragEnd}>
				<Row className={classes.taskContent}>
					{isLoading ? (
						<CustomSpinner height={300} color={'primary'} />
					) : (
						<>
							{columnsToDisplay.map(({ _id: id, taskIds, title }) => {
								const localTasks = taskIds.map((taskId) =>
									filteredTasks.find((f) => f._id === taskId)
								);
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
							<NonDroppableColumn
								data={tasksDue}
								title='Due Soon'
								handleMore={handleMore}
								setShowTaskModal={setShowTaskModal}
							/>
						</>
					)}
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
					snack={snack}
				/>
			)}
		</div>
	);
}

export default Tasks;
