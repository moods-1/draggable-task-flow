import React, {
	createContext,
	useState,
	useMemo,
	useCallback,
	useEffect,
} from 'react';
import { useSnackbar } from 'notistack';

import { getCompanyUsers } from '../api/users';
import { getCompanyColumns } from '../api/columns';
import { getCompanyTasks, taksDueSoon } from '../api/tasks';
import { getCompanyById } from '../api/companies';
import {
	getCompanyId,
	getIsAdmin,
	getStoredUser,
} from '../helpers/helperFunctions';

export const TaskContext = createContext({});

export const TaskContextProvider = (props) => {
	const [users, setUsers] = useState([]);
	const [refetchUsers, setRefetchUsers] = useState(false);
	const [tasks, setTasks] = useState({});
	const [columns, setColumns] = useState({});
	const [tasksDue, setTasksDue] = useState([]);
	const [company, setCompany] = useState({});
	const { enqueueSnackbar } = useSnackbar();
	const [dashboard, setDashboard] = useState({
		sidebarLarge: true,
		sidebarWidth: 0,
	});
	const companyId = useMemo(() => getCompanyId(), []);
	const isAdmin = useMemo(() => getIsAdmin(), []);
	const loggedInUser = getStoredUser();

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
		async function getAllTasks() {
			const taskData = await getCompanyTasks(false, companyId);
			const { status, response, message } = taskData;
			if (status === 200) {
				const localTasks = {};
				response.forEach((d) => {
					const { _id: id } = d;
					localTasks[id] = d;
				});
				setTasks({ ...localTasks });
			} else {
				snack(message || 'There was an error retrieving tasks.', 'error');
			}
		}
		getAllTasks();
	}, [companyId, snack]);

	useEffect(() => {
		async function getUsers() {
			if (companyId) {
				const userData = await getCompanyUsers(companyId);
				const { status, response, message } = userData;
				if (status === 200) {
					setUsers(response);
				} else {
					snack(message || 'There was an error retrieving users.', 'error');
				}
			}
		}
		getUsers();
	}, [companyId, refetchUsers, snack]);

	useEffect(() => {
		async function getColumns() {
			const columnData = await getCompanyColumns(companyId);
			const { status, response, message } = columnData;
			if (status === 200) {
				const localColumns = {};
				response.forEach((d) => {
					const { _id: id } = d;
					localColumns[id] = d;
				});
				setColumns({ ...localColumns });
			} else {
				snack(message || 'There was an error retrieving columns.', 'error');
			}
		}
		getColumns();
	}, [companyId, snack]);

	useEffect(() => {
		async function getTasksDueSoon() {
			const dueSoon = await taksDueSoon(5, companyId);
			const { status, response, message } = dueSoon;
			if (status === 200) {
				setTasksDue(response);
			} else {
				snack(
					message || 'There was an error retrieving tasks due soon.',
					'error'
				);
			}
		}
		getTasksDueSoon();
	}, [companyId, snack, tasks]);

	useEffect(() => {
		async function getCompany() {
			if (companyId) {
				const result = await getCompanyById(companyId);
				const { status, response, message } = result;
				if (status === 200) {
					setCompany(response);
				} else {
					snack(
						message || 'There was an error retrieving your company.',
						'error'
					);
				}
			}
		}
		getCompany();
	}, [companyId, snack]);

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
			tasksDue,
			isAdmin,
			snack,
			company,
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
			tasksDue,
			isAdmin,
			snack,
			company,
		]
	);

	return (
		<TaskContext.Provider value={providerValue}>
			{props.children}
		</TaskContext.Provider>
	);
};
