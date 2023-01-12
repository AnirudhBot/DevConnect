import React, { useState, useEffect } from "react";
import axios from "axios";
import { getContactsRoute } from "../utils/APIroutes";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@mui/icons-material/Person";

const Contacts = (props) => {
  const [contacts, setContacts] = useState([]);

  //fetching and setting user contacts
  useEffect(() => {
    const fetchData = async () => {
      const currentUser = JSON.parse(localStorage.getItem("app-user"));
      const data = await axios.get(`${getContactsRoute}/${currentUser._id}`);
      const userContacts = data.data;
      setContacts(userContacts);
    };
    fetchData();
  }, []);

  const activeHandler = (e) => {
    props.setCurrentChat(e.target.innerHTML);
  };

  return (
    <div style={{ overflow: "auto" }}>
      {contacts.map((user) => {
        return (
          <ListItem button key={user.id} onClick={activeHandler}>
            <PersonIcon sx={{ mr: 1 }} />
            <ListItemText>{user.username}</ListItemText>
          </ListItem>
        );
      })}
    </div>
  );
};

export default Contacts;
