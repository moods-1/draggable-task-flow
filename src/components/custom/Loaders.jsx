import React from 'react';
import { Spinner } from 'reactstrap';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  loadingBlock: {
    width:"100%",
    height: "100%",
    background: "#f5f5f5",
    overflow: "hidden",
    "&::after": {
      display: "block",
      content: "''",
      width: "100%",
      height: "100%",
      backgroundImage: "linear-gradient(to right, #fff, white, #fff)",
      transform: "translate(50%)",
      animationName: "$slide",
      animationDuration: "1800ms",
      animationIterationCount: "infinite",
      opacity: 0.7,
    },
  },
  "@keyframes slide": {
    "0%": {
      transform: "translate(-50%)",
    },
    "100%": {
      transform: "translate(100%)",
    },
  },
});

export function CustomSpinner({ height, color }) {
	const SpinnerStyle = {
		display: 'grid',
		placeItems: 'center',
		width: '100%',
		minHeight: height || 200,
	};
	return (
		<div style={SpinnerStyle}>
			<Spinner color={color} />
		</div>
	);
}

export const TableRowLoading = ({ columns }) => {
    const { loadingBlock } = useStyles();
    return (
      <tr>
        {columns.map(({ field }) => (
          <td key={field + Math.random() * 1000} className={loadingBlock} style={{height: '3rem'} } />
        ))}
      </tr>
    );
};
  
export const Slider = () => {
  const { loadingBlock } = useStyles();
  return (
    <div className={loadingBlock} />
  )
}