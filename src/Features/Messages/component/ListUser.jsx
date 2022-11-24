import React, { useMemo } from "react";
import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { makeStyles } from "@mui/styles";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import CircleIcon from "@mui/icons-material/Circle";
import messengerApi from "../../../api/messengerApi";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import QueryString from "qs";
import SketonUser from "./sketonUser";
import "./index.scss";
import { CircularProgress } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { STATIC_HOST } from "../../../constants";
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  header: {
    width: "95%",
    zIndex: 10,
  },
  Title: {
    color: "#51C332",
    padding: "0 28px",
    fontSize: "18px",
    borderBottom: "1px solid #51C332",
     textShadow: "1px 2px 3px grey"
  },
  List: {
    height: "420px",
    width: "100%",
    bgcolor: "background.paper",
    padding: "20px",
  },
  ListItem: {
    width: "100% !important",
    padding: "10px 3px 10px 27px !important",
  },
  imgUser: {
    width: "40px !important",
    height: "40px !important",
    borderRadius: "20px",
  },
  NameUser: {
    padding: "10px 10px 10px 6px",
    fontSize: "14px !important",
    fontWeight: "500 !important",
    color: "white",
  },

  status: {
    fontSize: "13px !important",
    color: "#5AD539",
    position: "absolute",
    right: 13,
    bottom: 0,
  },
  ofStatus: {
    fontSize: "13px !important",
    color: "#BCC0C4",
    position: "absolute",
    right: 13,
    bottom: 0,
  },
  InputFooter: {
    borderTop: "1px solid #51C332 ",
    height: "60px",
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  searchInput: {
    marginTop: "3px",
    boxSizing: "border-box",
    outline: "none",
    padding: "5px 27px",
  },
  icon: {
    position: "absolute",
    right: 6,
    top: 8,
    color: "grey",
  },
  iconsearch: {
    position: "absolute",
    left: 3,
    top: 6,
    color: "#3D8E22",
  },
});
function ListUser({ getUserids }) {
  const classes = useStyles();
  const search = useParams();
  // queryParams
  const queryParams = useMemo(() => {
    return QueryString.parse(search["*"]);
  }, [search]);

  const navigate = useNavigate();
  const online = useSelector((state) => state.mess.online);
  const elementRef = useRef();
  const [user2, setUser2] = useState(queryParams.user2);
  const [dataUser, setDataUser] = useState([]);
  const [User, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [change, setChange] = useState("");
  const [loadUser, setLoadUser] = useState(false);

  

  const idUser = useSelector((state) => state.user.current);
  const sl = 10;

  useEffect(() => {
    if (sl >= 10) {
      elementRef.current.style.overflow = "auto";
    }
  }, [sl]);

  useEffect(() => {
    (async () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const listData = await messengerApi.user();
      setUser(
        listData.data.user.filter(
          (user) => JSON.stringify(user._id) === JSON.stringify(idUser)
        )
      );
      setDataUser(
        listData.data.user.filter(
          (user) => JSON.stringify(user._id) !== JSON.stringify(idUser)
        )
      );

      setLoading(false);
    })();
  }, [idUser, online]);
  //search user
  const onSubmit = async (value) => {
    const users = await messengerApi.searchUser(value);
    setDataUser(
      users.data.user.filter(
        (user) => JSON.stringify(user._id) !== JSON.stringify(idUser)
      )
    );

    setLoading(false);
  };

  const handleChange = (e) => {
    setChange(e.target.value);
    setLoadUser(true);
  };
  const Timeout = useRef(null);
  useEffect(() => {
    if (change !== "") {
      Timeout.current = setTimeout(() => {
        onSubmit({ keyword: change });
        setLoadUser(false);
      }, 400);
    } else {
      onSubmit({ keyword: "empty" });
      setLoadUser(false);
    }

    return () => {
      clearTimeout(Timeout.current);
    };
  }, [change]);

  // day len STATIC_HOST
  useEffect(() => {
    navigate(QueryString.stringify({ user2: user2 }));
  }, [navigate, user2]);
  //load tin nhan
  const handleLoadMess = (userId1, userId2) => {
    setUser2(userId2);
  };

  useEffect(() => {
    const InfoUser2 = dataUser.filter(
      (user) => JSON.stringify(user._id) === JSON.stringify(user2)
    );
    getUserids(idUser, user2, InfoUser2[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user2, dataUser]);

  //

  return (
    <Box className={classes.root}>
      <Box component="div" className={classes.header}>
        <Box className={classes.Title}>
          <h2>WeChat</h2>
        </Box>
      </Box>
      <Box className="listUser">
        <form
          autoComplete="off"
          className="form-Search"
          style={{ position: "relative", width: "50%" }}
        >
          <input
            className={classes.searchInput}
            id="input-search"
            type="text"
            name="text"
            onChange={handleChange}
            value={change}
            placeholder="Nhập tên..."
          />
          {loadUser && (
            <CircularProgress
              size="18px"
              color="inherit"
              className={classes.icon}
            />
          )}
          <SearchRoundedIcon className={classes.iconsearch} />
        </form>

        <List
          ref={elementRef}
          className={classes.List}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {loading ? (
            <SketonUser length={6} />
          ) : (
            dataUser.map((elmUser) => {
              return (
                <ListItemButton
                  className={classes.ListItem}
                  sx={{
                    backgroundColor: `${
                      user2 === elmUser._id ? "#88DB71" : ""
                    }`,
                  }}
                  key={elmUser._id}
                  onClick={() => handleLoadMess(idUser, elmUser._id)}
                >
                  <ListItemIcon sx={{ position: "relative" }}>
                    <img
                      src={
                        elmUser.image.includes("images")
                          ? STATIC_HOST + elmUser.image
                          : elmUser.image
                      }
                      className={classes.imgUser}
                      alt="avartar"
                    />
                    <CircleIcon
                      className={
                        elmUser.status ? classes.status : classes.ofStatus
                      }
                    />
                  </ListItemIcon>
                  <Typography
                    className={classes.NameUser}
                    variant="h3"
                    gutterBottom
                  >
                    {elmUser.name}
                  </Typography>
                </ListItemButton>
              );
            })
          )}
        </List>
      </Box>
      <Box className={classes.InputFooter}>
        {loading ? (
          <SketonUser />
        ) : (
          <>
            <Link to="/avartar" target="_blank" rel="noopener noreferrer">
              <ListItemIcon sx={{ position: "relative", cursor: "pointer" }}>
                <img
                  src={
                    User[0]?.image.includes("images")
                      ? STATIC_HOST + User[0]?.image
                      : User[0]?.image
                  }
                  className={classes.imgUser}
                  alt="avartar"
                />
                <CircleIcon className={classes.status} />
              </ListItemIcon>
            </Link>

            <Typography className={classes.NameUser} variant="h3" gutterBottom>
              {User[0]?.name}
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
}

export default ListUser;
