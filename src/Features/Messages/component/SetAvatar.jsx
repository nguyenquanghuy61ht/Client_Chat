import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BoxForm from "../../auth/component/BoxForm";
import { makeStyles } from "@mui/styles";
import storageKeys from "../../../constants/storage-keys";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import messengerApi from "../../../api/messengerApi";
import { STATIC_HOST } from "../../../constants";

const useStyles = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: { color: "white" },
  avatar: {
    width: "50%",
    margin: "30px 0px",
  },
  image: {
    border: "1px solid white",
    borderRadius: "80px",
    padding: "5px",
    width: "100%",
    hover: {
      boxShadow: "0 0 2px 1px rgba(0, 140, 186, 0.5)",
    },
  },

  Upload: {
    position: "relative",
    overflow: "hidden",
    display: "inline-block",
  },
  btn: {
    border: "2px solid gray",
    color: "white",
    backgroundColor: "red",
    padding: "6px 18px",
    borderRadius: "8px",
    fontSize: "16px",
  },
  input: {
    fontSize: "100px",
    position: "absolute",
    left: 0,
    top: 0,
    opacity: 0,
  },
  menu: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    marginTop: "30px",
  },
});

function SetAvatar(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [selectedFile, setSelectedFile] = useState(null);
  const [avatar, setAvatar] = useState("");
 

  useEffect(() => {
    (async () => {
      try {
        const currentUserid = localStorage.getItem(storageKeys.USER);
        const user = await messengerApi.getUser(JSON.parse(currentUserid));
        setAvatar(user.data.user);
      } catch (error) {
        enqueueSnackbar(error.message, { variant: "error" });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar.preview);
    };
  }, [avatar]);
  const handleSetFile = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setAvatar(file);
    setSelectedFile(file);
  };
  const handleSubmission = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem(storageKeys.USER);
    if (!userId) {
      enqueueSnackbar("Tài khoản chưa xác thực", { variant: "error" });
      return false;
    }
    if (!selectedFile) {
      enqueueSnackbar("Bạn chưa upload ảnh!", { variant: "error" });
      return false;
    }
    const formData = new FormData();
    formData.append("image", selectedFile);
    fetch(`http://localhost:8080/auth/avatar/${JSON.parse(userId)}`, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token_chat")}`, //tieu de uy quyen
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          navigate("/chat");
          enqueueSnackbar("Cập nhật ảnh đại diện thành công!", {
            variant: "success",
          });
        }
      })
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: "error" });
      });
  };
  return (
    <BoxForm>
      <Box component="div" className={classes.root}>
        <Typography className={classes.title}>{avatar?.name}</Typography>
        <Box className={classes.avatar}>
          <img
            className={classes.image}
            src={
              avatar?.preview ||
              (avatar?.image?.includes("images")
                ? STATIC_HOST + avatar.image
                : avatar?.image)
            }
            alt="imgUser"
          />
        </Box>
        <Box className={classes.Upload}>
          <button className={classes.btn}>Upload image</button>
          <input
            onChange={(e) => handleSetFile(e)}
            className={classes.input}
            type="file"
            name="file"
            id="file-upload"
          />
        </Box>
      </Box>
      <Box component="div" className={classes.menu}>
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            navigate("/chat");
          }}
        >
          Quay lại
        </Button>
        <Button variant="outlined" onClick={(e) => handleSubmission(e)}>
          Tiếp tục
        </Button>
      </Box>
    </BoxForm>
  );
}

export default SetAvatar;
