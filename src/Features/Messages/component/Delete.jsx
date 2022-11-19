import React from "react";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  icon: {
    fontSize: "22px",
    color: "#EF4234",
    marginBottom: "15px",
  },
});
function Delete(props) {
    const classes = useStyles()
  return <DeleteSweepOutlinedIcon className={classes.icon} />;
}

export default Delete;
