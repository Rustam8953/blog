import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import style from './side.css';

export const SideBlock = ({ title, children }) => {
  return (
    <Paper className='rootBlock'>
      <Typography variant="h6" className="titleBlock">
        {title}
      </Typography>
        {children}
    </Paper>
  );
};