import React, {
	createContext,
	useState,
	useMemo,
	useCallback,
	useEffect,
} from 'react';
import { USERS, TASKS, COLUMNS } from '../helpers/data';

export const TaskContext = createContext({});

export const TaskContextProvider = (props) => {
	const [users, setUsers] = useState([]);
	const [loggedInUser, setLoggedInUser] = useState({});
	const [tasks, setTasks] = useState(TASKS);
	const [columns, setColumns] = useState(COLUMNS);
	const [dashboard, setDashboard] = useState({
		sidebarLarge: true,
		sidebarWidth: 0,
	});

	const handleDashboard = useCallback(
		(field, value, multiple) => {
			if (multiple) {
				setDashboard((prevState) => ({ ...prevState, ...value }));
			} else {
				if (field in dashboard) {
					setDashboard((prevState) => ({ ...prevState, [field]: value }));
				}
			}
		},
		[dashboard]
	);

	const handleColumns = useCallback(
		(data, type) => {
			if (type === 'edit') {
				setColumns((prevState) => ({ ...prevState, ...data }));
			}
		},
		[setColumns]
	);

	const handleUsers = useCallback(
		(value, type) => {
			if (type === 'new') {
				setUsers((prevState) => [value, ...prevState]);
			} else {
				const { id } = value;
				setUsers((prevState) => {
					const localUsers = [...prevState];
					const userIndex = localUsers.findIndex((u) => u.id === id);
					localUsers.splice(userIndex, 1, { ...value });
					return [...localUsers];
				});
			}
		},
		[setUsers]
	);

	const handleNewTask = useCallback(
		(newTask) => {
			const { id: taskId, state } = newTask;
			const targetColumn = Object.values(columns).find(
				(col) => col.title === state
			);
			if ('id' in targetColumn) {
				const { id: columnId } = targetColumn;
				setColumns((prevState) => ({
					...prevState,
					[columnId]: {
						...targetColumn,
						taskIds: [...targetColumn.taskIds, taskId],
					},
				}));
				setTasks((prevState) => ({ ...prevState, [taskId]: newTask }));
			}
		},
		[columns]
	);

	useEffect(() => {
		const localUsers = [...USERS];
		localUsers.forEach((user) => {
			const { id } = user;
			const assignedTasksSet = new Set([...user.assignedTasks])
			Object.values(tasks).forEach((task) => {
				const { id: assigneeId } = task?.assignee;
				if (id === assigneeId) {
					assignedTasksSet.add(task.id)
					user.assignedTasks = [...assignedTasksSet];
				}
			});
		});
		setUsers([...localUsers]);
	}, [tasks]);

	useEffect(()=>{
		if(users.length){
			setLoggedInUser(users.find((u) => u.id === '001'))
		}
	},[users])
	
	const providerValue = useMemo(
		() => ({
			dashboard,
			handleDashboard,
			setTasks,
			tasks,
			users,
			columns,
			handleColumns,
			handleNewTask,
			handleUsers,
			loggedInUser,
		}),
		[
			dashboard,
			handleDashboard,
			setTasks,
			tasks,
			users,
			columns,
			handleColumns,
			handleNewTask,
			handleUsers,
			loggedInUser,
		]
	);

	return (
		<TaskContext.Provider value={providerValue}>
			{props.children}
		</TaskContext.Provider>
	);
};
