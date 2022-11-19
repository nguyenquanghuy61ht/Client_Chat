import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ListUser from "./component/ListUser";
import Message from "./component/message";
import { makeStyles } from "@mui/styles";
import userApi from "../../api/userApi";
import { useState } from "react";
const useStyles = makeStyles({
  ListUser: {
    borderRight: "1px solid #51C332",
    padding: "0 0px 0 30px",
  },
});
function Chat(props) {
  const classes = useStyles();
  const [userIds, setUserId] = useState({});
  useEffect(() => {
    (async () => {
      try {
        await userApi.status({ status: true });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const getUserid = (userId1, userId2, InfoUser2) => {
    setUserId({ userId1, userId2, InfoUser2 });
  };
  const handleSetLoad = (setLoad) => {
    setLoad(true);
  };
  return (
    <Box >
      <Grid container p={1}>
        <Grid item xs={4} className={classes.ListUser}>
          <ListUser
            getUserids={(userId1, userId2, InfoUser2) => {
              getUserid(userId1, userId2, InfoUser2);
            }}
          />
        </Grid>
        <Grid item xs={8}>
          <Message
            userIds={userIds}
            onChange={(setLoad) => {
              handleSetLoad(setLoad);
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Chat;
