import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import BoxForm from "../BoxForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputFiled from "../inputFiled/inputFiled";
import InputPass from "../inputFiled/inputPass";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { login } from "../userSlice";
import { useSnackbar } from "notistack";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
// tạo schema để validate
const schema = yup.object().shape({
  email: yup
    .string()
    .email("email không hợp lệ")
    .required("Email là bắt buộc!"),
  password: yup.string().required("Mật khẩu là bắt buộc").min(8).max(32),
});
const useStyles = makeStyles({
  fontTitle: {
    color: "white",
    textTransform: "uppercase",
    fontWeight: 500,
    letterSpacing: "5px",
  },
  submit: {
    border: "2px solid #2ecc71",
    background: "none",
    display: "block",
    margin: "20px auto",
    textAlign: "center",
    padding: "10px 30px",
    outline: "none",
    color: "white",
    borderRadius: "25px",
    cursor: "pointer",
    textTransform: "uppercase",
    fontWeight: "200",
    transition: "250ms background ease",
  },
  linkSpan:{
    textDecoration:"none",
    color:"red",
  },
  option:{
    color:"white",
    fontSize:"15px"
  },
  logo:{
    width:"60px",
    height:"60px"
  }
});
function Login(props) {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //login logic
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  async function onSubmitHandler(value) {
    try {
      const action = login(value);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      if (resultAction.type === "user/login/fulfilled") {
         enqueueSnackbar("Chào mừng bạn đến với WeChat", {
           variant: "success",
         });
        return navigate("/chat");
      }
    } catch (error) {
      enqueueSnackbar("email hoặc mật khẩu không đúng", { variant: "error" });
    }
  }
  return (
    <BoxForm>
      <div className={classes.logo}>
        <img
          style={{width:"100%"}}
          src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/371_Wechat_logo-512.png"
          alt="logo"
        />
      </div>
      {isSubmitting && (
        <Stack sx={{ color: "grey.500" }} direction="row">
          <CircularProgress color="secondary" />
        </Stack>
      )}
      <form onSubmit={handleSubmit(onSubmitHandler)} noValidate>
        <h2 className={classes.fontTitle}>Đăng nhập</h2>

        <InputFiled register={register} name="email" nameError={errors.email} />

        <InputPass
          register={register}
          name="password"
          nameError={errors.password}
        />

        <button className={classes.submit} type="submit">
          Đăng nhập
        </button>
        <p className={classes.option}>
          Bạn quên mật khẩu ?{" "}
          <Link to="/sendermail" className={classes.linkSpan}>
            lấy lại mật khẩu
          </Link>
        </p>
        <p className={classes.option}>
          <Link to="/register" className={classes.linkSpan}>
            Đăng ký
          </Link>
        </p>
      </form>
    </BoxForm>
  );
}

export default Login;
