import * as React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  IconButton,
  Typography,
  Link,
  Box,
  AppBar,
  Toolbar,
  Container,
  TextField,
  CssBaseline,
} from "@mui/material";
import SignalWifiStatusbar4BarIcon from "@mui/icons-material/SignalWifiStatusbar4Bar";
import "./Messages.scss";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../topnav/TopNav";
import BottomNav from "../bottomnav/BottomNav";
import Copyright from "../Copyright";

function Messages(props) {
  console.log(props);
  const [profileInterests, setProfileInterest] = useState([]);
  const navigate = useNavigate();

  const logOut = (event) => {
    event.preventDefault();
    axios.get("/api/users/logout").then(() => {
      localStorage.removeItem("user");
      props.setCurrentUser(null);
      navigate("/login");
    });
  };

  return (
    <>
      {/* everything on this page is in this main Box, think of it as a fragment */}
      <Box sx={{
        pb: 10,
        // border: "3px solid red"
      }}>
        <CssBaseline />
        <TopNav />

        {/* THIS IS THE MAIN BODY - BETWEEN THE TOP NAV AND BOTTOM NAV */}
        <Container maxWidth="md"
          sx={{
            // border: "3px dashed blue"
          }}>
          <Box
            sx={{
              borderRadius: "1.75rem",
              backgroundColor: "#E4F8FF",
              // border: "3px solid red",
              padding: "2rem"
            }}
          >
            <Typography
              variant='h4'
              color="#008CCF"
              align='center'
              marginBottom="2rem"
            >
              Messages
            </Typography>

            <Typography variant='h5'>
              stuff - this blue card should replace the white card above
            </Typography>
          </Box>
        </Container>

        <br />
        <Copyright />
        <BottomNav value={props.value} setValue={props.setValue} />
      </Box>
    </>
  );
}
export default Messages;
