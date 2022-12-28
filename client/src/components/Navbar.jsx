import * as React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import Modal from "@mui/material/Modal";
import Find from "./Find";
import Requests from "./Requests";

export default function Navbar() {
  const navigate = useNavigate();
  const [findOpen, setFindOpen] = React.useState(false);
  const [requestsOpen, setRequestsOpen] = React.useState(false);
  const handleFindOpen = () => setFindOpen(true);
  const handleFindClose = () => setFindOpen(false);
  const handleRequestsOpen = () => setRequestsOpen(true);
  const handleRequestsClose = () => setRequestsOpen(false);
  const handleLogout = () => {
    localStorage.removeItem("app-user");
    navigate("/login");
  };

  return (
    <>
      <Box sx={{ height: "10vh", display: "flex", alignItems: "center" }}>
        <AppBar
          position="static"
          style={{ height: "100%", justifyContent: "center" }}
        >
          <Toolbar>
            <Diversity1Icon fontSize="large" sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              DevConnect
            </Typography>
            <Button color="inherit" onClick={handleFindOpen}>
              Find
            </Button>
            <Modal
              open={findOpen}
              onClose={handleFindClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Find />
            </Modal>
            <Button color="inherit" onClick={handleRequestsOpen}>
              Requests
            </Button>
            <Modal
              open={requestsOpen}
              onClose={handleRequestsClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Requests />
            </Modal>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
