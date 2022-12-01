import * as React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIroutes";

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();

  const toastNotif = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = new FormData(event.currentTarget);
    const username = user.get("username");
    const email = user.get("email");
    const password = user.get("password");

    if (username.length < 3) {
      toast.error("Username can't be less than 3 characters", toastNotif);
      return false;
    } else if (password.length < 6) {
      toast.error("Password can't be less than 6 characters", toastNotif);
      return false;
    } else if (email === "" || !email.includes("@") || !email.includes(".")) {
      toast.error("Email ID is not valid", toastNotif);
      return false;
    }

    const response = await axios.post(registerRoute, {
      username,
      email,
      password,
    });

    const data = response.data;
    if (data.status === false) toast.error(data.msg, toastNotif);
    if (data.status === true) {
      localStorage.setItem("app-user", JSON.stringify(data.user));
      navigate("/");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <ToastContainer />
    </ThemeProvider>
  );
}
