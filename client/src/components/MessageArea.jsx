import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

const MessageArea = ({ currentChat }) => {
  const [message, setMessage] = useState("");

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMessageHandler = () => {
    console.log(message);
  };

  if (currentChat) {
    return (
      <>
        <List
          style={{ paddingRight: "20px", height: "80%", overflowY: "auto" }}
        >
          <ListItem key="1">
            <Grid container>
              <Grid item xs={12}>
                <ListItemText
                  align="right"
                  primary="Hey man, What's up ?"
                ></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" secondary="09:30"></ListItemText>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem key="2">
            <Grid container>
              <Grid item xs={12}>
                <ListItemText
                  align="left"
                  primary="Hey, Iam Good! What about you ?"
                ></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="left" secondary="09:31"></ListItemText>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem key="3">
            <Grid container>
              <Grid item xs={12}>
                <ListItemText
                  align="right"
                  primary="Cool. i am good, let's catch up!"
                ></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" secondary="10:30"></ListItemText>
              </Grid>
            </Grid>
          </ListItem>
        </List>
        <Divider />
        <Grid container style={{ padding: "20px 0 20px 20px" }}>
          <Grid item xs={11}>
            <TextField
              id="outlined-basic-email"
              placeholder="Type your message"
              fullWidth
              value={message}
              onChange={handleMessageChange}
            />
          </Grid>
          <Grid xs={1} container justifyContent="center" alignItems="center">
            <SendIcon
              style={{ cursor: "pointer" }}
              onClick={sendMessageHandler}
            />
          </Grid>
        </Grid>
      </>
    );
  } else {
    return (
      <>
        <p>loader</p>
      </>
    );
  }
};

export default MessageArea;
