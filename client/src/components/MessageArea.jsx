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
require("@tensorflow/tfjs");
const toxicity = require("@tensorflow-models/toxicity");

const MessageArea = ({ currentChat, socket }) => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  //fetching past chat messages for current chat
  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axios.post(getMessagesRoute, {
        from: JSON.parse(localStorage.getItem("app-user"))._id,
        to: currentChat,
      });
      setChatMessages(response.data);
    };
    if (currentChat !== undefined) {
      fetchMessages();
    }
  }, [currentChat]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const submitOnEnter = (event) => {
    if (event.keyCode === 13 && message !== "") {
      sendMessageHandler();
    }
  };

  //sending message, toxicity check, updating chat messages
  const sendMessageHandler = async () => {
    const msgs = [...chatMessages];
    const user = await JSON.parse(localStorage.getItem("app-user"));
    let index = 0;
    const threshold = 0.9;
    toxicity.load(threshold).then(async (model) => {
      await model.classify([message]).then((predictions) => {
        let i = 0;
        while (i < predictions.length) {
          if (predictions[i].results[0].match === true) {
            index = 1;
            msgs.push({
              fromSelf: true,
              message: "Your message was not sent as it was found toxic!",
            });
            setChatMessages(msgs);
            break;
          }
          i++;
        }
        return;
      });
      if (index === 0) {
        msgs.push({ fromSelf: true, message });
        setChatMessages(msgs);
        socket.current.emit("send-msg", {
          from: user.username,
          to: currentChat,
          message,
        });
        axios.post(sendMessageRoute, {
          from: user._id,
          to: currentChat,
          message,
        });
      }
    });
    setMessage("");
  };

  //socket.io message receiving and chat updation
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (message) => {
        setArrivalMessage({ fromSelf: false, message });
      });
    }
  }, [socket.current]);

  useEffect(() => {
    arrivalMessage && setChatMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [chatMessages]);

  if (currentChat) {
    return (
      <div style={{ display: "flex", flexFlow: "column", height: "90vh" }}>
        <List
          style={{
            height: "80vh",
            overflowY: "auto",
            margin: "5px 0",
          }}
        >
          {chatMessages.map((message) => {
            return (
              <ListItem ref={scrollRef} key={uuidv4()}>
                <Grid container>
                  <Grid item xs={12}>
                    <ListItemText
                      align={message.fromSelf ? "right" : "left"}
                      style={{
                        wordWrap: "break-word",
                        padding: message.fromSelf ? "0 0 0 30%" : "0 30% 0 0",
                      }}
                    >
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
        <Grid container style={{ paddingLeft: "10px", height: "10vh" }}>
          <Grid
            item
            xs={11}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              id="outlined-basic-email"
              placeholder="Type your message"
              fullWidth
              value={message}
              onChange={handleMessageChange}
              onKeyDown={submitOnEnter}
              InputProps={{ disableUnderline: true }}
              style={{
                border: "1px solid #1976d2",
                borderRadius: "5px",
                padding: "0 10px",
              }}
            />
          </Grid>
          <Grid
            item
            xs={1}
            container
            justifyContent="center"
            alignItems="center"
          >
            <SendIcon
              style={{ cursor: "pointer" }}
              onClick={sendMessageHandler}
            />
          </Grid>
        </Grid>
      </div>
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
