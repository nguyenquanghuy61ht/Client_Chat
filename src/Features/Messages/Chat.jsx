import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ListUser from "./component/ListUser";
import Message from "./component/message";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
  ListUser: {
    borderRight: "1px solid grey",
    padding:"0 0px 0 30px"
  },
});
function Chat(props) {
  const classes = useStyles();
  return (
    <Box>
      <Grid container  p={1}>
        <Grid item xs={4} className={classes.ListUser} >
          <ListUser />
        </Grid>
        <Grid item xs={8}>
          <Message />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Chat;
