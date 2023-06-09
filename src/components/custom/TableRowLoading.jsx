import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  loadingBlock: {
    height: "3rem",
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

const RowLoading = ({ columns }) => {
  const { loadingBlock } = useStyles();
  return (
    <tr>
      {columns.map(({ field }) => (
        <td key={field + Math.random() * 1000} className={loadingBlock} />
      ))}
    </tr>
  );
};

export default RowLoading;
