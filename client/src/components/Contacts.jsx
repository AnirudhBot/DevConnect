import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@mui/icons-material/Person";

const Contacts = ({ setCurrentChat }) => {
  const activeHandler = (e) => {
    setCurrentChat(e.target.value);
  };
  
  return (
    <>
      <ListItem button key="RemySharp" onClick={activeHandler}>
        <PersonIcon sx={{ mr: 1 }} />
        <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
      </ListItem>
      <ListItem button key="Alice" onClick={activeHandler}>
        <PersonIcon sx={{ mr: 1 }} />
        <ListItemText primary="Alice">Alice</ListItemText>
      </ListItem>
    </>
  );
};

export default Contacts;
