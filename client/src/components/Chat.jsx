import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import { io } from "socket.io-client";
import MessageArea from "./MessageArea";
import Contacts from "./Contacts";
import { host } from "../utils/APIroutes";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    height: "100%",
    boxShadow: "none",
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
});

const Chat = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const socket = useRef();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);

  useEffect(() => {
    const setUser = async () => {
      if (!localStorage.getItem("app-user")) {
        navigate("/login");
      } else setCurrentUser(await JSON.parse(localStorage.getItem("app-user")));
    };
    setUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser.username);
    }
  }, [currentUser]);

  return (
    <div
      style={{
        height: "90vh",
      }}
    >
      <Grid component={Paper} className={classes.chatSection}>
        <Grid
          item
          xs={3}
          className={classes.borderRight500}
          style={{ backgroundColor: "#a2f4fa" }}
        >
          <Grid item xs={12} style={{ padding: "10px" }}>
            <TextField
              id="outlined-basic-email"
              label="Search"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Divider />
          <List>
            <Contacts setCurrentChat={setCurrentChat} />
          </List>
        </Grid>
        <Grid item xs={9}>
          <MessageArea currentChat={currentChat} socket={socket} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
