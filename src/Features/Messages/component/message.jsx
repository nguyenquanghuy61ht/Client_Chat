import React from "react";
import { useEffect, useRef } from "react";
import Peer from "simple-peer";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import "./index.scss";
import {
  Button,
  ListItemIcon,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import CircleIcon from "@mui/icons-material/Circle";
import SendIcon from "@mui/icons-material/Send";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../auth/component/userSlice";
import io from "socket.io-client";
import messengerApi from "../../../api/messengerApi";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import storageKeys from "../../../constants/storage-keys";
import { Online } from "../messSlice";
import Picker from "emoji-picker-react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import { useSnackbar } from "notistack";
import Delete from "./Delete";
import "./index.scss";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import SketonMess from "./sketonMess";
import SketonUser from "./sketonUser";
import { Link, useNavigate } from "react-router-dom";
import Video from "./Video-Call";
function Message({ userIds, onChange }) {
  const navigate = useNavigate();

  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [load, setLoad] = useState(true);
  const [loading, setLoading] = useState(true);
  const { userId1, userId2, InfoUser2 } = userIds;
  const [user2, setUser2] = useState();
  const [idDelete, setIdDelete] = useState("");

  const { enqueueSnackbar } = useSnackbar();
  const online = useSelector((state) => state.mess.online);

  const [showEmoji, setShowEmoji] = useState(false);
  const classes = useStyles();
  const elementContent = useRef();
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [conversation, setConversation] = useState([]);
  const [keyup, setKeyup] = useState(false);
  const [DataKeyUp, setDataKeyUp] = useState({});
  const [idMess, setIdMess] = useState("");
  //dialog
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);


  //video call

  const handleClose = () => {
    setOpen(false);
    setOpen2(false);
  };

  const url = "http://localhost:8080/";

  useEffect(() => {
    (async () => {
      try {
        if (userId2) {
          const user = await messengerApi.getUser(userId2);
          setUser2(user.data.user);
        }
      } catch (error) {
        console.log(error);
        enqueueSnackbar(error.message, { variant: "error" });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId2, online]);
  useEffect(() => {
    if (userId2) {
      setValue("");
      setLoad(false);
    }
  }, [userId2]);
  useEffect(() => {
    elementContent.current.scrollTop = elementContent.current.scrollHeight;
  }, [userId2, conversation]);
  //ket moi voi socket
  const socketRef = useRef();
  useEffect(() => {
    socketRef.current = io("http://localhost:8080");
    return () => {
      socketRef.current.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const currentUserid = localStorage.getItem(storageKeys.USER);
  useEffect(() => {
    if (currentUserid) {
      socketRef.current.emit("add-user", JSON.parse(currentUserid));
    }
  }, [currentUserid]);

  //logout
  const handleLogout = () => {
    const action = logout();
    dispatch(action);
  };
  //load messages
  useEffect(() => {
    (async () => {
      const _id = await localStorage.getItem(storageKeys.USER);
      const response = await messengerApi.getAllMessage({
        from: JSON.parse(_id),
        to: userId2,
      });
      setConversation(response.data);
      setShowEmoji(false);
      setLoading(false);
    })();
  }, [userId2, idDelete]);

  // xu ly send message
  const handleChangeInput = (e) => {
    setValue(e.target.value);
  };

  const handleKeyDown = () => {
    const _id = localStorage.getItem(storageKeys.USER);
    socketRef.current.emit("keyup-msg", {
      to: userId2,
      from: JSON.parse(_id),
      msg: value,
    });
  };
  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("keyup-recieve", (data) => {
        setDataKeyUp(data);
      });
    }
  }, []);

  useEffect(() => {
    if (
      DataKeyUp.msg !== "" &&
      DataKeyUp.msg?.length !== 1 &&
      DataKeyUp.to === userId1 &&
      DataKeyUp.from === userId2
    ) {
      setKeyup(true);
      let waitingTime = setTimeout(() => {
        setKeyup(false);
      }, 3000);

      return () => {
        clearTimeout(waitingTime);
      };
    } else {
      setKeyup(false);
    }
  }, [DataKeyUp, userId1, userId2]);

  //keypress

  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      console.log("hihi");
      //Nếu User chưa bấm vào thì không thể gửi được
      if (!userId2 && value === "") {
        return;
      }
      const _id = localStorage.getItem(storageKeys.USER);
      let newMes = await messengerApi.postMessage({
        from: _id,
        to: userId2,
        message: value,
      });
      socketRef.current.emit("send-msg", {
        to: userId2,
        from: JSON.parse(_id),
        msg: value,
        createdAt: newMes.data.data.createdAt,
        _id: newMes.data.data._id,
      });
      const msgs = [...conversation];
      msgs.push({
        fromSelf: true,
        message: value,
        createdAt: newMes.data.data.createdAt,
        _id: newMes.data.data._id,
      });
      setConversation(msgs);
      setShowEmoji(false);
      setValue("");
    }
  };

  const handleSendMessage = async () => {
    //Nếu User chưa bấm vào thì không thể gửi được
    if (!userId2 && value === "") {
      return;
    }
    const _id = localStorage.getItem(storageKeys.USER);
    let newMes = await messengerApi.postMessage({
      from: _id,
      to: userId2,
      message: value,
    });
    socketRef.current.emit("send-msg", {
      to: userId2,
      from: JSON.parse(_id),
      msg: value,
      createdAt: newMes.data.data.createdAt,
      _id: newMes.data.data._id,
    });
    const msgs = [...conversation];
    msgs.push({
      fromSelf: true,
      message: value,
      createdAt: newMes.data.data.createdAt,
      _id: newMes.data.data._id,
    });
    setConversation(msgs);
    setShowEmoji(false);
    setValue("");
  };
  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("msg-recieve", (data) => {
        console.log(data);
        setArrivalMessage({
          fromSelf: false,
          message: data.msg,
          createdAt: data.createdAt,
          _id: data._id,
        });
      });
    }
  }, []);
  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("online-recieve", (data) => {
        dispatch(Online(data));
      });
    }
  }, [dispatch]);

  useEffect(() => {
    arrivalMessage && setConversation((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);
  // show emoji
  const handleShowEmoji = () => {
    setShowEmoji(!showEmoji);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = value;
    message += emojiObject.emoji;
    setValue(message);
  };
  //
  const hadleFocus = () => {
    setShowEmoji(false);
  };
  const handleCloseEmoji = () => {
    setValue("");
  };

  //remove mess
  function handleRemoveMess(idMess) {
    setOpen(true);
    setIdMess(idMess);
  }

  const handleAgreeRemove = async () => {
    if (!idMess) {
      return false;
    }
    const id = localStorage.getItem(storageKeys.USER);
    const response = await messengerApi.removeMessage(idMess);
    socketRef.current.emit("delete-msg", {
      to: userId2,
      from: JSON.parse(id),
      _id: idMess,
    });
    if (response.status === 200) {
      let newData = [...conversation];
      const index = newData.findIndex(
        (mess) => mess._id === response.data.messageDelete._id
      );
      if (index >= 0) {
        newData[index].message = "Tin nhắn đã thu hồi";
        setConversation(newData);
        enqueueSnackbar("Bạn đã thu hồi tin nhắn!", {
          variant: "success",
        });
        setOpen(false);
      }
    }
  };

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("delete-recieve", (data) => {
        (async () => {
          const response = await messengerApi.getUser(data.from);
          setIdDelete(data._id);
          enqueueSnackbar(`${response.data.user.name} vừa thu hồi tin nhắn!`, {
            variant: "warning",
          });
        })();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleOpenVideo = () => {
    setOpen2(true);
    // callUser(userId2);
  };
  useEffect(() => {
    socketRef.current.on("OpenForm", (data) => {
      setOpen2(true);
    });
  }, []);

  return (
    <Box component="div" className={classes.rootContent}>
      <Dialog
        open={open2}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent
          className="Dlalog-content"
          sx={{ backgroundColor: "#2C3230" ,padding:"0"}}
        >
          <Video userId2={userId2} socketRef={socketRef} open2={open2} />
        </DialogContent>
      </Dialog>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent
          className="Dlalog-content"
          sx={{ backgroundColor: "#2C3230" }}
        >
          <WarningAmberOutlinedIcon className="icon" />
          <p className="content1" sx={{ margin: "14px 0px" }}>
            Một khi đã thu hồi bạn sẽ không thể hoàn tác lại tin nhắn !
          </p>
          <p className="content2">
            <strong>Bạn vẫn tiếp tục?</strong>
          </p>
          <DialogActions className="Dlalog-button">
            <Button
              variant="outlined"
              color="error"
              onClick={handleClose}
              sx={{ padding: "5px 32px" }}
            >
              Huỷ
            </Button>
            <Button
              variant="outlined"
              color="success"
              onClick={handleAgreeRemove}
            >
              Đồng ý
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Box className={classes.Header}>
        {load ? (
          <Box className={classes.leftHeader}>
            <img
              src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/371_Wechat_logo-512.png"
              alt="logo"
            />
          </Box>
        ) : loading ? (
          <SketonUser />
        ) : (
          <Box className={classes.leftHeader}>
            <ListItemIcon sx={{ position: "relative" }}>
              <img
                src={
                  user2?.image.includes("images")
                    ? url + user2?.image
                    : user2?.image
                }
                className={classes.imgUser}
                alt="avartar"
              />

              <CircleIcon
                className={user2?.status ? classes.status : classes.ofStatus}
              />
            </ListItemIcon>
            <Typography className={classes.NameUser} variant="h3" gutterBottom>
              {user2?.name}
            </Typography>
          </Box>
        )}

        <VideocamIcon onClick={handleOpenVideo} />

        <LogoutIcon className={classes.rightHeader} onClick={handleLogout} />
      </Box>
      {load && (
        <Box component="div" className={classes.contentBackGround}></Box>
      )}

      <Box component="div" className={classes.content} ref={elementContent}>
        {loading ? (
          <SketonMess length={5} />
        ) : (
          conversation?.map((elmMessage, idx) => {
            const date = new Date(elmMessage.createdAt);
            const d = date.getDate();
            const m = date.getMonth() + 1;
            const hours = date.getHours();
            const minutes = date.getMinutes();

            return (
              <div key={uuidv4()}>
                {elmMessage.fromSelf === false ? (
                  <Box className={classes.block}>
                    {" "}
                    <Box className={classes.messenger}>
                      <Box className={classes.avartar}>
                        <img
                          src={
                            user2?.image.includes("images")
                              ? url + user2?.image
                              : user2?.image
                          }
                          className={classes.imgAvartar}
                          alt="avartar"
                        />
                      </Box>
                      <Box className={classes.Boxcontent}>
                        <Box className={classes.contentMes}>
                          <span>{elmMessage.message}</span>
                        </Box>
                        <Box className={classes.timer}>
                          {hours}:
                          {String(minutes).length === 1
                            ? "0" + String(minutes)
                            : minutes}{" "}
                          {d}/{m}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  <Box className={classes.block2} id="box-tooltip">
                    {" "}
                    <Box className={classes.messengerUser}>
                      <Box className={classes.contentMes2}>
                        {elmMessage.message}
                      </Box>
                      <Box className={classes.timer}>
                        {hours}:
                        {String(minutes).length === 1
                          ? "0" + String(minutes)
                          : minutes}{" "}
                        {d}/{m}
                      </Box>
                    </Box>
                    <Box className={classes.iconremove}>
                      {elmMessage.message !== "Tin nhắn đã thu hồi" && (
                        <Tooltip title="Thu hồi" arrow placement="top">
                          <Box
                            id="icon-Remove"
                            sx={{ display: "none", cursor: "pointer" }}
                            onClick={() => {
                              handleRemoveMess(elmMessage._id);
                            }}
                          >
                            <Delete />
                          </Box>
                        </Tooltip>
                      )}
                    </Box>
                  </Box>
                )}
              </div>
            );
          })
        )}
      </Box>
      {load === false && (
        <Box className={classes.InputFooter} id="emoji">
          {showEmoji && (
            <Picker
              onEmojiClick={handleEmojiClick}
              className="emoji-picker-react"
            />
          )}
          <Box className={classes.selectIcon} onClick={handleShowEmoji}>
            <img
              style={{
                width: "30px",
                height: "30px",
                cursor: "pointer",
                marginRight: "15px",
              }}
              src="https://honghot.net/wp-content/uploads/tong-hop-icon-mat-cuoi-chat-nhat-21.png"
              alt="emoj"
            />
          </Box>
          <Box className={classes.Input}>
            <Box sx={{ position: "relative" }}>
              {" "}
              <div className={classes.inputFiledBorder}>
                <input
                  value={value}
                  className={classes.inputFiled}
                  type="text"
                  placeholder="Aa"
                  onChange={(e) => handleChangeInput(e)}
                  onFocus={hadleFocus}
                  onKeyDown={handleKeyDown}
                  onKeyPress={(event) => {
                    handleKeyPress(event);
                  }}
                />
              </div>
              <HighlightOffIcon
                fontSize="small"
                className={classes.iconDelete}
                onClick={handleCloseEmoji}
              />
              {keyup && (
                <div className={classes.wrapperloading}>
                  <div className="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              )}
            </Box>
          </Box>
          <Box className={classes.buttonSend} onClick={handleSendMessage}>
            <SendIcon sx={{ fontSize: "30px", marginLeft: "50px" }} />
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Message;

const useStyles = makeStyles({
  rootContent: {
    width: "100%",
    padding: "10px 0px",
    position: "relative",
  },
  Header: {
    height: "60px",
    borderBottom: "1px solid #51C332",
    display: "flex",
    width: "100%",
    zIndex: 100,
    justifyContent: "space-between",
    paddingLeft: "14px",
  },
  InputFooter: {
    padding: "10px 0",
    height: "60px",
    width: "100%",
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderTop: "1px solid #51C332",
  },
  imgUser: {
    width: "45px !important",
    height: "45px !important",
    borderRadius: "22px",
  },
  imgAvartar: {
    width: "36px !important",
    height: "36px !important",
    borderRadius: "19px",
  },
  NameUser: {
    padding: "8px 0px 10px 0px",
    fontSize: "18px !important",
    fontWeight: "600 !important",
  },
  status: {
    fontSize: "15px !important",
    color: "#5AD539",
    position: "absolute",
    right: 11,
    bottom: 16,
  },
  ofStatus: {
    fontSize: "15px !important",
    color: "#BCC0C4",
    position: "absolute",
    right: 11,
    bottom: 16,
  },
  content: {
    height: "450px",
    overflow: "auto",
    backgroundImage:
      "url('https://startuanit.net/wp-content/uploads/2020/08/bo-suu-tap-hinh-nen-vu-tru-4k-doc-dao-va-an-tuong-1.jpg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    paddingLeft: "14px",
  },
  contentBackGround: {
    width: "100%",
    height: "520px",
    backgroundImage:
      "url('https://media.giphy.com/media/A608loAlQgF4ag7k4m/giphy.gif')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  messenger: { padding: "20px 10px", display: "flex" },
  avartar: { marginRight: "10px" },
  contentMes: {
    maxWidth: "300px",
    padding: "7px",
    backgroundColor: "#E4E6EB",
    borderRadius: "10px",
  },
  Boxcontent: {},
  timer: {
    marginTop: "4px",
    color: "white",
    fontSize: "13px",
  },
  messengerUser: {
    padding: "20px 10px",
    marginLeft: "50px",
    display: "inline-block",
  },
  contentMes2: {
    backgroundColor: "#51C332",
    color: "white",
    maxWidth: "300px",
    padding: "7px",
    borderRadius: "10px",
  },
  block: {
    display: "flex",
    alignItems: "center",
  },
  block2: {
    display: "flex",
    alignItems: "center",
  },
  selectIcon: {
    width: "20%",
    display: "flex",
    justifyContent: "end",
  },
  Input: { width: "30%" },
  inputFiledBorder: {
    background: "#F3F3F5",
    width: "100%",
    padding: "0 2px 0 15px",
    borderTopLeftRadius: "15px",
    borderBottomLeftRadius: "15px",
  },
  inputFiled: {
    width: "96%",
    padding: "0px  40px 0px 0px",
    height: "35px",
    background: "#F3F3F5",
    borderTopRightRadius: "15px",
    borderBottomRightRadius: "15px",
    outline: "none",
    border: "none",
    fontSize: "15px",
  },
  iconDelete: {
    position: "absolute",
    right: "-37px",
    top: "7px",
    color: "#C0C0C0 !important",
  },
  buttonSend: {
    cursor: "pointer",
    color: "#0084FF",
    flex: "1",
  },
  leftHeader: {
    color: "white",
    display: "flex",
  },
  rightHeader: {
    marginRight: "30px",
    color: "red",
    cursor: "pointer",
  },
  boxEmoji: {
    position: "absolute !important",
    tpo: 0,
  },

  wrapperloading: {
    position: "absolute",
    bottom: "106%",
    left: "-30%",
    backgroundColor: "#2c3230",
    width: "80px",
    borderRadius: "0.5rem",
    padding: "0 10px",
  },
});
