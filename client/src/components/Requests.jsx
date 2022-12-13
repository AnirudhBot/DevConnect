import React, { useState, useEffect } from "react";
import axios from "axios";
import { getRequestsRoute, acceptRequestRoute } from "../utils/APIroutes";
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

const Requests = () => {
  const [allUsers, setAllUsers] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("app-user"));
  const currUserId = currentUser._id;
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${getRequestsRoute}/${currUserId}`);
      setAllUsers(data);
    };
    fetchData();
  }, []);

  const toastNotif = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
  };

  const acceptHandler = async (e) => {
    const id = e.target.parentNode.id;
    const { data } = await axios.post(acceptRequestRoute, {
      id,
      currUserId,
    });
    if (data.status === true) toast.success(data.msg, toastNotif);
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
          <List>
            {allUsers.map((user) => {
              return (
                <ListItem key={user.id} id={user.id}>
                  <PersonIcon sx={{ mr: 1 }} />
                  <ListItemText>{user.username}</ListItemText>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={acceptHandler}
                  >
                    Accept
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

export default Requests;
