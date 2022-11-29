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

function Matches(props) {
  const [value, setValue] = React.useState(0);
  const [profileInterests, setProfileInterest] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`api/users/${JSON.parse(localStorage.getItem("user")).id}`)
      .then((result) => {
        const user = result.data[0];
        props.setCurrentUser(user);
      });
  }, []);

  useEffect(() => {
    axios.get(`/api/user_interests/${props.user.id}`).then((data) => {
      console.log(props.user);
      setProfileInterest([...data.data]);
    });
  }, []);

  const logOut = (event) => {
    event.preventDefault();
    axios.get("/api/users/logout").then(() => {
      localStorage.removeItem("user");
      props.setCurrentUser(null);
      navigate("/login");
    });
  };

  const renderInterestList = profileInterests.map((interest) => {
    return (
      <Button
        className="btn"
        key={interest.id}
        variant="contained"
        sx={{ margin: 0.5 }}
      >
        {interest.name}
      </Button>
    );
  });

  console.log(profileInterests);

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

      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction href="/" label="Home" icon={<HomeIcon />} />

          <BottomNavigationAction
            href="/profile"
            label="Profile"
            icon={<AccountBoxIcon />}
          />
          <BottomNavigationAction label="Matches" icon={<PeopleAltIcon />} />
          <BottomNavigationAction label="Messages" icon={<MessageIcon />} />
          <BottomNavigationAction
            label="Logout"
            icon={<LogoutIcon />}
            onClick={logOut}
          />
        </BottomNavigation>
      </Paper>
    </div>
  );
}
export default Matches;
