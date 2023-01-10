import React from 'react';
import styled from '@emotion/styled';
import { statusColor } from '../../helpers/helperFunctions';

function RoundPill({ value }) {
	const Pill = styled.div`
		width: 10px;
		height: 10px;
		border-radius: 50%;
	`;
	const pillColor = statusColor(value);
	return <Pill style={{ background: pillColor }} />;
}

export default RoundPill;
