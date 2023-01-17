import React, {
	createContext,
	useState,
	useMemo,
	useCallback,
	useEffect,
} from 'react';
import { useSnackbar } from 'notistack';
import { getAllUsers } from '../api/users';
import { getAllColumns } from '../api/columns';
import { getAllTasks } from '../api/tasks';

export const TaskContext = createContext({});

export const TaskContextProvider = (props) => {
	const [users, setUsers] = useState([]);
	const [refetchUsers, setRefetchUsers] = useState(false);
	const [loggedInUser, setLoggedInUser] = useState({});
	const [tasks, setTasks] = useState({});
	const [columns, setColumns] = useState([]);
	const { enqueueSnackbar } = useSnackbar();
	const [dashboard, setDashboard] = useState({
		sidebarLarge: true,
		sidebarWidth: 0,
	});

	const snack = useCallback(
		(message, type) => {
			enqueueSnackbar(message, { variant: type, autoHideDuration: 4000 });
		},
		[enqueueSnackbar]
	);

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
			if (type === 'delete task') {
				const { colId, colData } = data;
				setColumns((prevState) => ({ ...prevState, [colId]: colData }));
			} else if (type === 'move task') {
				setColumns({ ...data });
			} else {
				setColumns({ ...data });
			}
		},
		[setColumns]
	);

	const handleUsers = useCallback(
		(value, type) => {
			if (type === 'new') {
				setUsers((prevState) => [value, ...prevState]);
			} else {
				const { _id: id } = value;
				setUsers((prevState) => {
					const localUsers = [...prevState];
					const userIndex = localUsers.findIndex((u) => u._id === id);
					localUsers.splice(userIndex, 1, { ...value });
					return [...localUsers];
				});
			}
		},
		[setUsers]
	);

	const handleNewTask = useCallback(
		(newTask) => {
			const { _id: taskId, state } = newTask;
			const targetColumn = Object.values(columns).find(
				(col) => col.title === state
			);
			if ('title' in targetColumn) {
				const { _id: columnId } = targetColumn;
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
		async function getUsers() {
			const userData = await getAllUsers();
			const { status, data } = userData;
			if (status === 200) {
				setUsers(data);
			} else {
				snack('There was an error retrieving users.', 'error');
			}
		}
		getUsers();
	}, [refetchUsers, snack]);

	useEffect(() => {
		async function getTasks() {
			const taskData = await getAllTasks();
			const { status, data } = taskData;
			if (status === 200) {
				const localTasks = {};
				data.forEach((d) => {
					const { _id: id } = d;
					localTasks[id] = d;
				});
				setTasks({ ...localTasks });
			} else {
				snack('There was an error retrieving tasks.', 'error');
			}
		}
		getTasks();
	}, [snack]);

	useEffect(() => {
		async function getColumns() {
			const columnData = await getAllColumns();
			const { status, data } = columnData;
			if (status === 200) {
				const localColumns = {};
				data.forEach((d) => {
					const { _id: id } = d;
					localColumns[id] = d;
				});
				setColumns({ ...localColumns });
			} else {
				snack('There was an error retrieving columns.', 'error');
			}
		}
		getColumns();
	}, [snack]);

	useEffect(() => {
		if (users.length) {
			setLoggedInUser(users.find((u) => u._id === '63c149099e9fb6a68fcb052c'));
		}
	}, [users]);

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
			setRefetchUsers,
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
			setRefetchUsers,
		]
	);

	return (
		<TaskContext.Provider value={providerValue}>
			{props.children}
		</TaskContext.Provider>
	);
};
