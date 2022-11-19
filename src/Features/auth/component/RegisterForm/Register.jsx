import { Box } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { signup } from "../userSlice";
import { useSnackbar } from "notistack";
import { makeStyles } from "@mui/styles";
import BoxForm from "../BoxForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputFiled from "../inputFiled/inputFiled";
import InputPass from "../inputFiled/inputPass";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
// tạo schema để validate
const schema = yup.object().shape({
  name: yup.string().required("Tên là bắt buộc!"),
  email: yup
    .string()
    .email("email không hợp lệ")
    .required("Email là bắt buộc!"),
  password: yup.string().required("Mật khẩu là bắt buộc").min(8).max(32),
  confirmPwd: yup
    .string()
    .required("Nhập lại mật khẩu là bắt buộc")
    .oneOf([yup.ref("password")], "Mật khẩu không khớp"),
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
    padding: "15px 40px",
    outline: "none",
    color: "white",
    borderRadius: "25px",
    cursor: "pointer",
    textTransform: "uppercase",
    fontWeight: "200",
    transition: "250ms background ease",
  },
});
function Register(props) {
  const classes = useStyles();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  //Register form logic
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  async function onSubmitHandler(value) {
    const { name, email, password } = value;
    const data = { name, email, password };
    try {
      const action = signup(data);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      enqueueSnackbar("Đăng ký thành công!!", { variant: "success" });
      reset();
      //do somthinh here on
      // console.log("new user", user);
    } catch (error) {
      enqueueSnackbar("email đã tồn tại", { variant: "error" });
    }
  }
  return (
    <BoxForm>
      {isSubmitting && (
        <Stack sx={{ color: "grey.500" }} direction="row">
          <CircularProgress color="secondary" />
        </Stack>
      )}
      <form onSubmit={handleSubmit(onSubmitHandler)} noValidate>
        <h2 className={classes.fontTitle}>Đăng ký</h2>
        <br />

        <InputFiled register={register} name="name" nameError={errors.name} />

        <InputFiled register={register} name="email" nameError={errors.email} />
       
        <InputPass
          register={register}
          name="password"
          nameError={errors.password}
        />
       
        <InputPass
          register={register}
          name="confirmPwd"
          confirm="confirm"
          nameError={errors.confirmPwd}
          lable="Nhập lại mật khẩu"
        />
        <br />

        <button className={classes.submit} type="submit">
          Đăng ký
        </button>
      </form>
    </BoxForm>
  );
}

export default Register;
