import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { sendMessageRoute, getMessagesRoute } from "../utils/APIroutes";
import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const MessageArea = ({ currentChat, socket }) => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axios.post(getMessagesRoute, {
        from: JSON.parse(localStorage.getItem("app-user"))._id,
        to: currentChat,
      });
      setChatMessages(response.data);
    };
    if (currentChat != undefined) {
      fetchMessages();
    }
  }, [currentChat]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMessageHandler = async () => {
    await axios.post(sendMessageRoute, {
      from: JSON.parse(localStorage.getItem("app-user"))._id,
      to: currentChat,
      message,
    });
    socket.current.emit("send-msg", {
      from: JSON.parse(localStorage.getItem("app-user")).username,
      to: currentChat,
      message,
    });

    const msgs = [...chatMessages];
    msgs.push({ fromSelf: true, message });
    setChatMessages(msgs);

    setMessage("");
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (message) => {
        setArrivalMessage({ fromSelf: false, message: message });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setChatMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [chatMessages]);

  if (currentChat) {
    return (
      <>
        <List
          style={{ paddingRight: "20px", height: "80%", overflowY: "auto" }}
          class
        >
          {chatMessages.map((message) => {
            return (
              <ListItem ref={scrollRef} key={uuidv4()}>
                <Grid container>
                  <Grid item xs={12}>
                    <ListItemText align={message.fromSelf ? "right" : "left"}>
                      {message.message}
                    </ListItemText>
                  </Grid>
                  {/* <Grid item xs={12}>
                    <ListItemText align={message.fromSelf ? "right" : "left"}>
                      time
                    </ListItemText>
                  </Grid> */}
                </Grid>
              </ListItem>
            );
          })}
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
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ textAlign: "center", fontSize: "1.5rem" }}>
          Welcome
          <br />
          to
          <br /> DevConnect!
        </div>
      </div>
    );
  }
};

export default MessageArea;
