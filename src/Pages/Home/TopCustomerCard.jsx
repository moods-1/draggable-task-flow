import React from 'react';

export default function TopCustomerCard({ customer }) {
	const { logo, customerName, licensesPurchased } = customer;
	return (
		<div className='license-card'>
			<div className='image-div'>
				<img src={logo} width={'100%'} height={'100%'} alt={customerName} />
			</div>
			<div className='details'>
				<p className='name'>{customerName}</p>
				<p>
					<span className='name'>Licenses Purchased:</span> {licensesPurchased}
				</p>
			</div>
		</div>
	);
}
