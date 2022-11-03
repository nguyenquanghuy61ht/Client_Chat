import React from "react";
import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import { Avatar, ListItemIcon, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import SendIcon from "@mui/icons-material/Send";
const useStyles = makeStyles({
  rootContent: {
    width: "100%",
    padding: "10px",
    position: "relative",
  },
  Header: {
    height: "60px",
    borderBottom: "1px solid grey",
    display: "flex",
    width: "100%",
    zIndex: 100,
  },
  InputFooter: {
    padding: "10px 0",
    height: "60px",
    width: "100%",
    position: "fixed",
    bottom: 0,
    display: "flex",
    alignItems: "center",
  },
  imgUser: {
    width: "45px !important",
    height: "45px !important",
  },
  imgAvartar: {
    width: "40px !important",
    height: "40px !important",
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
    bottom: 20,
  },
  content: {
    maxHeight: "650px",
    overflow: "auto",
  },
  messenger: { padding: "20px", display: "flex", alignItems: "center" },
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
    fontSize: "16px",
    float: "right",
    marginRight: "4px",
  },
  messengerUser: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "65px",
    padding: "20px",
  },
  contentMes2: {
    backgroundColor: "#0084FF",
    color: "white",
    maxWidth: "300px",
    padding: "7px",
    borderRadius: "10px",
  },
  block: {
    display: "inline",
  },
  selectIcon: {
    width: "400px",
  },
  Input: { maxWidth: "450px" },
  inputFiled: {
    width: "358px",
    padding: "5px 20px",
    height: "35px",
    backgroundColor: "#F3F3F5",
    borderRadius: "22px",
    outline: "none",
    border: "none",
    marginRight: "15px",
    fontSize: "20px",
  },
  buttonSend: {
    cursor: "pointer",
    color: "#0084FF",
    flex: 1,
  },
});
function Message(props) {
  const classes = useStyles();
  const elementContent = useRef();
  useEffect(() => {
    elementContent.current.scrollTop = 650;
  }, []);
  return (
    <Box component="Div" className={classes.rootContent}>
      <Box className={classes.Header}>
        <ListItemIcon sx={{ position: "relative" }}>
          <Avatar
            className={classes.imgUser}
            alt="avartar"
            src="https://technext.github.io/classimax/images/user/user-thumb.jpg"
          />
          <CircleIcon className={classes.status} />
        </ListItemIcon>
        <Typography className={classes.NameUser} variant="h3" gutterBottom>
          Nguyen Huy
        </Typography>
      </Box>
      <Box component="div" className={classes.content} ref={elementContent}>
        <Box className={classes.block}>
          {" "}
          <Box className={classes.messenger}>
            <Box className={classes.avartar}>
              <Avatar
                className={classes.imgAvartar}
                alt="avartar"
                src="https://technext.github.io/classimax/images/user/user-thumb.jpg"
              />
            </Box>
            <Box className={classes.Boxcontent}>
              <Box className={classes.contentMes}>
                <span>
                  Day la bai viet moi nhat cua toi trong khoa 6 thang gan day
                  ben minh con tuyrn sinh ien moi ra truong
                </span>
              </Box>
              <Box className={classes.timer}>15:34 26/7</Box>
            </Box>
          </Box>
        </Box>
        <Box className={classes.block}>
          {" "}
          <Box className={classes.messengerUser}>
            <Box className={classes.contentMes2}>
              <span>
                Day la bai viet moi nhat cua toi trong khoa 6 thang gan day ben
                minh con tuyrn sinh ien moi ra truong
              </span>
            </Box>
            <Box className={classes.timer}>15:34 26/7</Box>
          </Box>
        </Box>
        <Box className={classes.block}>
          {" "}
          <Box className={classes.messenger}>
            <Box className={classes.avartar}>
              <Avatar
                className={classes.imgAvartar}
                alt="avartar"
                src="https://technext.github.io/classimax/images/user/user-thumb.jpg"
              />
            </Box>
            <Box className={classes.Boxcontent}>
              <Box className={classes.contentMes}>
                <span>
                  Day la bai viet moi nhat cua toi trong khoa 6 thang gan day
                  ben minh con tuyrn sinh ien moi ra truong
                </span>
              </Box>
              <Box className={classes.timer}>15:34 26/7</Box>
            </Box>
          </Box>
        </Box>
        <Box className={classes.block}>
          {" "}
          <Box className={classes.messengerUser}>
            <Box className={classes.contentMes2}>
              <span>
                Day la bai viet moi nhat cua toi trong khoa 6 thang gan day ben
                minh con tuyrn sinh ien moi ra truong
              </span>
            </Box>
            <Box className={classes.timer}>15:34 26/7</Box>
          </Box>
        </Box>
        <Box className={classes.block}>
          {" "}
          <Box className={classes.messengerUser}>
            <Box className={classes.contentMes2}>
              <span>
                Day la bai viet moi nhat cua toi trong khoa 6 thang gan day ben
                minh con tuyrn sinh ien moi ra truong
              </span>
            </Box>
            <Box className={classes.timer}>15:34 26/7</Box>
          </Box>
        </Box>
        <Box className={classes.block}>
          {" "}
          <Box className={classes.messengerUser}>
            <Box className={classes.contentMes2}>
              <span>
                Day la bai viet moi nhat cua toi trong khoa 6 thang gan day ben
                minh con tuyrn sinh ien moi ra truong
              </span>
            </Box>
            <Box className={classes.timer}>15:34 26/7</Box>
          </Box>
        </Box>
        <Box className={classes.block}>
          {" "}
          <Box className={classes.messengerUser}>
            <Box className={classes.contentMes2}>
              <span>
                Day la bai viet moi nhat cua toi trong khoa 6 thang gan day ben
                minh con tuyrn sinh ien moi ra truong
              </span>
            </Box>
            <Box className={classes.timer}>15:34 26/7</Box>
          </Box>
        </Box>
      </Box>
      <Box className={classes.InputFooter}>
        <Box className={classes.selectIcon}>1</Box>
        <Box className={classes.Input}>
          <input className={classes.inputFiled} type="text" placeholder="Aa" />
        </Box>
        <Box className={classes.buttonSend}>
          <SendIcon sx={{ fontSize: "35px" }} />
        </Box>
      </Box>
    </Box>
  );
}

export default Message;
