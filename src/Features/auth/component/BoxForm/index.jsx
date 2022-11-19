import { Box } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  main: {
    width: "100%",
    
  },
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "270px",
    padding: "35px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    background: "#191919",
    border: "none",
    borderRadius: "25px",
    textAlign: "center",
  },
});
function BoxForm(props) {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <Box className={classes.root}>{props.children}</Box>
    </div>
  );
}

export default BoxForm;
