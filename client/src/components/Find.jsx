import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAllUsersRoute, sendRequestRoute } from "../utils/APIroutes";
import Box from "@mui/material/Box";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vh",
  height: "80vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

const Find = () => {
  const [allUsers, setAllUsers] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("app-user"));
  const currUserId = currentUser._id;
  const currUsername = currentUser.username;

  //fetching all platform users except friends
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${getAllUsersRoute}/${currUserId}`);
      setAllUsers(data);
    };
    fetchData();
  }, []);

  const toastNotif = {
    position: "bottom-right",
    autoClose: 2000,
    pauseOnHover: true,
  };

  const connectHandler = async (e) => {
    const username = e.target.parentNode.children[1].children[0].innerHTML;
    const { data } = await axios.post(sendRequestRoute, {
      username,
      currUserId,
      currUsername,
    });
    if (data.status === "true") {
      toast.success(data.msg, toastNotif);
      e.target.textContent = "Requested";
      e.target.disabled = true;
    }
    if (data.status === "false") toast.error(data.msg, toastNotif);
  };

  return (
    <>
      <Box sx={style}>
        <Grid>
          <Grid item xs={12} style={{ padding: "10px" }}>
            <TextField
              id="outlined-basic-email"
              label="Search"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Divider />
          <List style={{ height: "55vh", overflowY: "auto" }}>
            {allUsers.map((user) => {
              return (
                <ListItem key={user._id}>
                  <PersonIcon sx={{ mr: 1 }} />
                  <ListItemText>{user.username}</ListItemText>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={connectHandler}
                  >
                    Connect
                  </Button>
                </ListItem>
              );
            })}
          </List>
        </Grid>
      </Box>
      <ToastContainer />
    </>
  );
};

export default Find;
