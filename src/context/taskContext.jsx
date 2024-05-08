import React, {
	createContext,
	useState,
	useMemo,
	useCallback,
	useEffect,
} from 'react';
import { useSnackbar } from 'notistack';

import { getCompanyUsers, getUserById, logoutUser } from '../api/users';
import { getCompanyColumns } from '../api/columns';
import { getCompanyTasks, taksDueSoon } from '../api/tasks';
import { getCompanyById } from '../api/companies';
import {
	getStoredUser,
	handleLogin,
	unauthorizedLogout,
} from '../helpers/helperFunctions';

export const TaskContext = createContext({});

export const TaskContextProvider = (props) => {
	const [users, setUsers] = useState([]);
	const [loggedInUser, setLoggedInUser] = useState(null);
	const [isAdmin, setIsAdmin] = useState(false);
	const [refetchUsers, setRefetchUsers] = useState(false);
	const [tasks, setTasks] = useState({});
	const [columns, setColumns] = useState({});
	const [tasksDue, setTasksDue] = useState([]);
	const [company, setCompany] = useState({});
	const [headerText, setHeaderText] = useState({ title: '', subtitle: '' });
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

	const handleUserLogin = useCallback((data) => {
		if (data) {
			handleLogin(data);
			setLoggedInUser(data);
			setIsAdmin(data.roles.includes('admin'));
		}
	}, []);

	const handleUserLogout = useCallback(() => {
		const { _id: id } = loggedInUser;
		const logout = async () => {
			const result = await logoutUser({ id });
			const { status } = result;
			if (status < 400) {
				unauthorizedLogout();
				setLoggedInUser(null);
				setIsAdmin(false);
			}
		};
		if (id) logout();
	}, [loggedInUser]);

	const handleHeaderText = useCallback((data) => {
		setHeaderText(data);
	}, []);

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
			} else if (type === 'edit') {
				const { _id: id } = value;
				setUsers((prev) => {
					const userIndex = prev.findIndex((u) => u._id === id);
					if (userIndex || userIndex === 0) {
						return [
							...prev.slice(0, userIndex),
							value,
							...prev.slice(userIndex + 1),
						];
					}
					return prev;
				});
				if (loggedInUser._id === id) {
					setLoggedInUser(value);
				}
			} else if (type === 'load') {
				setUsers([...value]);
			}
		},
		[loggedInUser]
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
			const { companyId } = loggedInUser;
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
		if (loggedInUser) getAllTasks();
	}, [snack, loggedInUser]);

	useEffect(() => {
		async function getUsers() {
			const { companyId } = loggedInUser;
			if (companyId) {
				const userData = await getCompanyUsers(companyId);
				const { status, response } = userData;
				if (status < 400) {
					setUsers(response);
				}
			}
		}
		if (loggedInUser && refetchUsers) getUsers();
	}, [refetchUsers, loggedInUser]);

	useEffect(() => {
		async function getColumns() {
			const { companyId } = loggedInUser;
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
		if (loggedInUser) getColumns();
	}, [snack, loggedInUser]);

	useEffect(() => {
		async function getTasksDueSoon() {
			const { companyId } = loggedInUser;
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
		if (loggedInUser) getTasksDueSoon();
	}, [snack, tasks, loggedInUser]);

	useEffect(() => {
		async function getCompany() {
			const { companyId } = loggedInUser;
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
		if (loggedInUser) getCompany();
	}, [snack, loggedInUser]);

	useEffect(() => {
		const loggedUser = getStoredUser();
		const fetchUser = async () => {
			const { _id } = loggedUser;
			const result = await getUserById(_id);
			const { status, response } = result;
			if (status < 400) {
				setLoggedInUser(response);
				setIsAdmin(response.roles.includes('admin'));
			}
		};
		if (loggedUser) fetchUser();
	}, []);

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
			handleUserLogin,
			handleUserLogout,
			handleHeaderText,
			headerText,
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
			handleUserLogin,
			handleUserLogout,
			handleHeaderText,
			headerText,
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
