import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { makeStyles } from "@mui/styles";
import { useRef } from "react";
const useStyles = makeStyles({
  root: {
    position: "relative",
  },
  InputFiled: {
    position: "relative",
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
    fontSize: "13px",
  },
  iconShowEye: {
    position: "absolute",
    right: 12,
    top: 8,
    color: "#0097E6",
    cursor: "pointer",
  },
});
function InputPass({ register, name, nameError, lable, confirm }) {
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const elementRef = useRef(null);
  const handleSetshow = () => {
    if (elementRef.current.firstChild.type === "password") {
      elementRef.current.firstChild.type = "text";
      setShow(true);
    } else {
      elementRef.current.firstChild.type = "password";
      setShow(false);
    }
  };
  return (
    <div className={classes.root} ref={elementRef}>
      <input
        autoComplete="off"
        className={classes.InputFiled}
        {...register(name)}
        placeholder={lable || name}
        type={confirm ? "password" : name}
        required
      />
      <p className={classes.infoErr}>{nameError?.message}</p>
      {show && (
        <VisibilityIcon
          className={classes.iconShowEye}
          onClick={handleSetshow}
        />
      )}
      {!show && (
        <VisibilityOffIcon
          onClick={handleSetshow}
          className={classes.iconShowEye}
        />
      )}
    </div>
  );
}

export default InputPass;
