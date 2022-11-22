import React, { useMemo } from "react";
import { makeStyles } from "@mui/styles";
import BoxForm from "../BoxForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputFiled from "../inputFiled/inputFiled";
import InputPass from "../inputFiled/inputPass";
import { useNavigate, useParams } from "react-router-dom";
import userApi from "../../../../api/userApi";
import { useSnackbar } from "notistack";

// tạo schema để validate
const schema = yup.object().shape({
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
    padding: "10px 30px",
    outline: "none",
    color: "white",
    borderRadius: "25px",
    cursor: "pointer",
    textTransform: "uppercase",
    fontWeight: "200",
    transition: "250ms background ease",
  },
  logo: {
    width: "60px",
    height: "60px",
  },
});
function FormNewPass(props) {
  const classes = useStyles();
  let navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const search = useParams();

  const queryParams = useMemo(() => {
    return search["*"];
  }, [search]);
  const onSubmitHandler = async (data) => {
    let newData = { ...data };
    newData = {
      ...newData,
      passwordToken: queryParams.split("/")[0],
      userId: queryParams.split("/")[1],
    };
    try {
      const resultAction = await userApi.changePassWord(newData);
      if (resultAction.status === 200) {
        enqueueSnackbar("Thay đổi mật khẩu thành công.", {
          variant: "success",
        });
        navigate("/login");
        reset();
      }
    } catch (error) {
      enqueueSnackbar("Thay đổi mật khẩu thất bại", { variant: "error" });
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
        <h2 className={classes.fontTitle}>Đặt lại mật khẩu</h2>
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
        <button className={classes.submit} type="submit">
          Xác nhận
        </button>
      </form>
    </BoxForm>
  );
}

export default FormNewPass;
