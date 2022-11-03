import React from "react";
import { useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import { makeStyles } from "@mui/styles";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CircleIcon from "@mui/icons-material/Circle";
const useStyles = makeStyles({
  root:{
    width:"100%"
  },
  header: {
    width: "95%",
    zIndex: 10,
  },
  Title: {
    padding: "0 30px",
    fontSize: "22px",
    borderBottom: "1px solid grey",
  },
  List: {
    height: "600px",
    width: "100%",
    bgcolor: "background.paper",
    padding: "20px",
  },
  ListItem: {
    padding: "15px 30px !important",
  },
  imgUser: {
    width: "67px !important",
    height: "67px !important",
  },
  NameUser: {
    padding: "8px 10px 10px 10px",
    fontSize: "20px !important",
    fontWeight: "600 !important",
  },
  status: {
    fontSize: "15px !important",
    color: "#5AD539",
    position: "absolute",
    right: 5,
    bottom: 0,
  },
  InputFooter: {
    borderTop: "1px solid grey ",
    height: "60px",
    width: "100%",
  
  },
});
function ListUser(props) {
  const classes = useStyles();
  const elementRef = useRef();
  const sl = 10;
  useEffect(() => {
    if (sl >= 10) {
      elementRef.current.style.overflow = "auto";
    }
  }, [sl]);
  return (
    <Box className={classes.root}>
      <Box component="Div" className={classes.header}>
        <Box className={classes.Title}>
          <h2>WeChat</h2>
        </Box>
      </Box>
      <Box>
        <List
          ref={elementRef}
          className={classes.List}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <ListItemButton className={classes.ListItem}>
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
          </ListItemButton>
          <ListItemButton className={classes.ListItem}>
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
          </ListItemButton>
          <ListItemButton className={classes.ListItem}>
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
          </ListItemButton>
          <ListItemButton className={classes.ListItem}>
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
          </ListItemButton>
          <ListItemButton className={classes.ListItem}>
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
          </ListItemButton>
          <ListItemButton className={classes.ListItem}>
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
          </ListItemButton>
          <ListItemButton className={classes.ListItem}>
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
          </ListItemButton>
          <ListItemButton className={classes.ListItem}>
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
          </ListItemButton>
          <ListItemButton className={classes.ListItem}>
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
          </ListItemButton>
          <ListItemButton className={classes.ListItem}>
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
          </ListItemButton>
          <ListItemButton className={classes.ListItem}>
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
          </ListItemButton>
          <ListItemButton className={classes.ListItem}>
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
          </ListItemButton>
          <ListItemButton className={classes.ListItem}>
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
          </ListItemButton>
        </List>
      </Box>
      <Box className={classes.InputFooter}>Tai ung dung</Box>
    </Box>
  );
}

export default ListUser;
