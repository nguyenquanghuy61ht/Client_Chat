import React from "react";
import { makeStyles } from "@mui/styles";
import BoxForm from "../BoxForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputFiled from "../inputFiled/inputFiled";
import { useNavigate } from "react-router-dom";
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
      <form onSubmit={handleSubmit(onSubmitHandler)} noValidate>
        <h3 className={classes.fontTitle}>Nhập Email của bạn</h3>
        <br />
        <InputFiled register={register} name="email" nameError={errors.email} />
        <br />
        <button className={classes.submit} type="submit">
          Gửi
        </button>
      </form>
    </BoxForm>
  );
}

export default ResetPass;
