import React from "react";
import { makeStyles } from "@mui/styles";
import BoxForm from "../BoxForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputFiled from "../inputFiled/inputFiled";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import userApi from "../../../../api/userApi";

// tạo schema để validate
const schema = yup.object().shape({
  email: yup
    .string()
    .email("email không hợp lệ")
    .required("Email là bắt buộc!"),
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
  linkSpan: {
    textDecoration: "none",
    color: "red",
  },
  option: {
    color: "white",
    fontSize: "15px",
  },
  logo: {
    width: "60px",
    height: "60px",
  },
});

function ResetPass(props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmitHandler =async (data) => {
    try {
      const resultAction = await userApi.senderMail(data);
      if(resultAction.status===200){
        enqueueSnackbar("Chúng tôi đã gửi đến hộp thư của bạn đường link để thay đổi mk vui lòng kiểm tra .", { variant: "success" });
        reset()
      }
    } catch (error) {
      enqueueSnackbar("email không tồn tại", { variant: "error" });
    }

  };

  return (
    <BoxForm>
      <div className={classes.logo}>
        <img
          style={{ width: "100%" }}
          src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/371_Wechat_logo-512.png"
          alt="logo"
        />
      </div>
      <form onSubmit={handleSubmit(onSubmitHandler)} noValidate>
        <h3 className={classes.fontTitle}>Nhập Email của bạn</h3>
        <InputFiled register={register} name="email" nameError={errors.email} />
        <button className={classes.submit} type="submit">
          Gửi
        </button>
        <p className={classes.option}>
          Quay lại trang?
          <Link to="/login" className={classes.linkSpan}>
            {" "}
            Đăng nhập
          </Link>
        </p>
      </form>
    </BoxForm>
  );
}

export default ResetPass;
