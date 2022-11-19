import { Box } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import BoxForm from "../BoxForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputFiled from "../inputFiled/inputFiled";
import InputPass from "../inputFiled/inputPass";

// tạo schema để validate
const schema = yup.object().shape({
  name: yup.string().required("Tên là bắt buộc!"),
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
function FormNewPass(props) {
  const classes = useStyles();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmitHandler = (data) => {
    console.log({ data });
    reset();
  };

  return (
    <BoxForm>
      <form onSubmit={handleSubmit(onSubmitHandler)} noValidate>
        <h2 className={classes.fontTitle}>Đặt lại mật khẩu</h2>
        <br />
        <InputPass
          register={register}
          name="password"
          nameError={errors.password}
        />
        <br />
        <InputPass
          register={register}
          name="password"
          nameError={errors.password}
          confirm="confirm"
          lable="Nhập lại mật khẩu"
        />
        <br />

        <button className={classes.submit} type="submit">
          Xác nhận
        </button>
      </form>
    </BoxForm>
  );
}

export default FormNewPass;
