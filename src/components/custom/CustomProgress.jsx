import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function CustomProgress({ labels, values, customClass, title }) {
	return (
		<div className={customClass}>
			{title && <p className='section-title'>{title}</p>}
			{labels.map((label, index) => (
				<div className='progress-box' key={label}>
					<p>{label}</p>
					<div style={{ width: 50, height: 50 }}>
						<CircularProgressbar
							value={values[index]}
							text={`${values[index]}%`}
							strokeWidth={5}
							circleRatio
							styles={buildStyles({
								textColor: 'red',
								path: 'turquoise',
								trailColor: 'gold',
							})}
						/>
					</div>
				</div>
			))}
		</div>
	);
}

export default CustomProgress;
