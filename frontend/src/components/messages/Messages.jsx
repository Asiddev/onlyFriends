import * as React from "react";
import { red } from "@mui/material/colors";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  IconButton,
  Typography,
  Link,
  CssBaseline,
  Box,
  AppBar,
  Toolbar,
  Container,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Grid,
  Paper,
  BottomNavigationAction,
  BottomNavigation,
  TextField,
  Input,
} from "@mui/material";
import SignalWifiStatusbar4BarIcon from "@mui/icons-material/SignalWifiStatusbar4Bar";
import { MoreVert, ShareIcon } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RestoreIcon from "@mui/icons-material/Restore";
import ArchiveIcon from "@mui/icons-material/Archive";
import "./Messages.scss";

import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MessageIcon from "@mui/icons-material/Message";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../bottomnav/BottomNav";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © Nico Hernandez, Alex Sidor, Kevin Lee "}
      <Link color="inherit" href="https://github.com/Asiddev/onlyFriends">
        OnlyFriends
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
    <div>
      <section class="sticky">
        <div class="bubbles">
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>

          <CssBaseline />

          <Box marginBottom={10}>
            <AppBar>
              <Toolbar className="navbar-logo">
                <Box
                  component="img"
                  sx={{ width: 150 }}
                  alt="OnlyFriends logo"
                  src="https://i.imgur.com/Bgur1Fk.png"
                />
              </Toolbar>
            </AppBar>
          </Box>

          <Container maxWidth="sm" className="relative">
            <div className="shadow ">
              <Card sx={{ maxWidth: "100%" }} className="block padding">
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="center"
                >
                  Status
                </Typography>
                <TextField
                  style={{ width: "500px" }}
                  placeholder="Whats on your mind?"
                ></TextField>
                <br />
                <br />
                <CardHeader
                  className="top-container"
                  avatar={
                    <Avatar
                      src={props.user.profile_picture}
                      sx={{ bgcolor: red[300] }}
                    ></Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVert />
                    </IconButton>
                  }
                  title="Online"
                  subheader={
                    <SignalWifiStatusbar4BarIcon style={{ fill: "green" }} />
                  }
                />

                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="center"
                ></Typography>
                <Container maxWidth="sm">
                  <Box bgcolor="white" height="50vh" mb={2} pt={2}>
                    <Box bgcolor="white" height="50vh" mb={2} pt={2}>
                      <Box
                        bgcolor="light-grey"
                        marginBottom={1}
                        height="70px"
                        p={3}
                        boxShadow={1}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Jason
                        </Typography>
                      </Box>
                      <Box
                        bgcolor="light-grey"
                        marginBottom={1}
                        height="70px"
                        p={3}
                        boxShadow={1}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Jason
                        </Typography>
                      </Box>
                      <Box marginBottom={1} height="70px" p={3} boxShadow={1}>
                        <Typography variant="body2" color="text.secondary">
                          Jason
                        </Typography>
                      </Box>
                      <Box
                        bgcolor="light-grey"
                        marginBottom={1}
                        height="70px"
                        p={3}
                        boxShadow={1}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Jason
                        </Typography>
                      </Box>
                      <Box
                        bgcolor="light-grey"
                        marginBottom={1}
                        height="70px"
                        p={3}
                        boxShadow={1}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Jason
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Container>
                <CardContent className="center"></CardContent>
              </Card>
            </div>

            <br />
          </Container>
        </div>
      </section>
      <BottomNav value={props.value} setValue={props.setValue} />
    </div>
  );
}
export default Messages;
