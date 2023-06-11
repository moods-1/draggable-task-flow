import { makeStyles } from '@material-ui/core';
export default makeStyles((theme) => ({
    chartsMain: {
        padding: '30px',
		width: '100%',
		display: 'flex',
		gap: '30px',
		flexWrap: 'wrap',
    },
    chartBox: {
        minWidth: '300px',
        flex: 1,
    }
}));
