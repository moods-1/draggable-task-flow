import React from 'react';
import { Button } from 'reactstrap';
import useStyles from '../styles/AppStyles';

function ContentHeader({ title, subtitle, showButton, buttonColor,buttonText, buttonFunction }) {
	const classes = useStyles();

	return (
		<div className={classes.contentHeader}>
			<div>
				<p className='content-header-title'>{title}</p>
				<p className='content-header-subtitle'>{subtitle}</p>
			</div>
			{
                showButton? <Button size='sm' color={buttonColor || ''} className='shadow-none' onClick={buttonFunction}>
				{buttonText}
			</Button>:<div/>
            }
            
		</div>
	);
}

export default ContentHeader;
