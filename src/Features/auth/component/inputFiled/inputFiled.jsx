import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
  root:{
    position:"relative"
  },
  InputFiled: {
    border: "2px solid #0097e6",
    background: "none",
    display: "block",
    margin: "30px 0",
    padding: "10px 45px",
    width: "200px",
    outline: "none",
    color: "white",
    borderRadius: "25px",
    textAlign: "center",
    transition: "250ms width ease, 250ms border-color ease",
    focus: {
      width: "250px",
      borderColor: "#6fb98f",
    },
    hover: {
      width: "220px",
    },
  },
  infoErr: {
    width: "100%",
    margin: 0,
    padding: " 10px 15px",
    position: "absolute",
    bottom: "-33px",
    left: "50%",
    transform: "translateX(-50%)",
    color: "red",
    fontSize:"13px"
  },
});
function InputFiled({ register, name, nameError }) {
  const classes = useStyles();
  const [showErr,setShowErr]=useState(false)
  useEffect(() => {
    if (nameError?.message.length > 0) {
      setShowErr(true);
    } else {
      setShowErr(false);
    }
  }, [nameError]);

  return (
    <div className={classes.root}>
      <input
        autoComplete="off"
        className={classes.InputFiled}
        {...register(name)}
        placeholder={name}
        type={name}
        required
      />
      {showErr && <p className={classes.infoErr}>{nameError?.message}</p>}
    </div>
  );
}

export default InputFiled;
