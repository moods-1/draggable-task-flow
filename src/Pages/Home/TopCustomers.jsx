import React, { useEffect, useState } from 'react';
import { getTopCustomers } from '../../api/customers';
import { Slider } from '../../components/custom/Loaders';
import TopCustomerCard from './TopCustomerCard';

export default function TopCustomers() {
	const [topCustomers, setTopCustomers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchTopCustomers = async () => {
			const result = await getTopCustomers();
			const { status, response } = result;
			if (status < 400) {
				setTopCustomers(response);
				setIsLoading(false);
			}
		};
		fetchTopCustomers();
	}, []);

	return (
		<div className='dashcard section-flex-1'>
			<p className='section-title'>Top Customers by Licenses </p>
			<div className='customer-card-content'>
				{isLoading ? (
					<Slider />
				) : (
					topCustomers.map((customer, idx) => (
						<TopCustomerCard key={idx} customer={customer} />
					))
				)}
			</div>
		</div>
	);
}
