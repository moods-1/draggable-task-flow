import React from 'react';
import { statusColor } from '../helpers/helperFunctions';

function PriorityCounts({ labels, title, values, customClass }) {
	return (
		<div className={customClass}>
			{title && <p className='section-title'>{title}</p>}
			{labels.map((label, index) => (
				<div className='priority-box' key={label}>
					<p style={{ color: statusColor(label) }}>{label}</p>
					<p>{values[index]}</p>
				</div>
			))}
		</div>
	);
}

export default PriorityCounts;
