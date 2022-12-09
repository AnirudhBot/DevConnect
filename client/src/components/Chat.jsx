import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";

import MessageArea from "./MessageArea";
import Contacts from "./Contacts";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: "100vw",
    height: "100%",
    boxShadow: "none",
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
  const [currentChat, setCurrentChat] = useState(undefined);

  useEffect(() => {
    if (!localStorage.getItem("app-user")) {
      navigate("/login");
    }
  }, []);

  return (
    <div style={{ height: "90vh" }}>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={3} className={classes.borderRight500}>
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
          <MessageArea currentChat={currentChat} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
