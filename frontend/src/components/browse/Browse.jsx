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
} from "@mui/material";
import { MoreVert, ShareIcon } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RestoreIcon from "@mui/icons-material/Restore";
import ArchiveIcon from "@mui/icons-material/Archive";
import "./Browse.scss";

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

function Browse(props) {
  const [value, setValue] = React.useState("home");
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderInterestList = profileInterests.map((interest) => {
    return (
      <Button
        className="btn"
        key={interest.id}
        variant="contained"
        sx={{ margin: 0.3 }}
      >
        <Typography fontSize="0.7rem">{interest.name}</Typography>
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
            <div className="shadow">
              <Card
                sx={{ maxWidth: "100%", height: "max-content" }}
                className="block padding"
                style={{
                  backgroundColor: "#E4F8FF",
                  borderRadius: "1.75rem",
                  paddingBottom: "0",
                }}
              >
                <Button class="noselect" id="button-left">
                  <CloseIcon fontSize="large" />
                </Button>
                <Button class="noselect" id="button-right">
                  <CheckIcon fontSize="large" />
                </Button>

                <CardHeader
                  className="top-container-name"
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
                  title={props.user.name}
                  subheader={props.user.location}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="center"
                >
                  {props.user.description}
                </Typography>
                <CardMedia
                  sx={{ mx: "auto", width: 450, height: 300 }}
                  className="border-img"
                  component="img"
                  image={props.user.banner_picture}
                  alt="banner_picture"
                />
                <CardContent className="center">
                  <Grid container className="interests-container">
                    <Grid item>{profileInterests && renderInterestList}</Grid>
                  </Grid>
                </CardContent>
              </Card>
            </div>
            <Copyright />
            <br />
          </Container>
        </div>
      </section>

      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation showLabels value={value} onChange={handleChange}>
          <BottomNavigationAction
            href="/"
            label="Home"
            icon={<HomeIcon />}
            value="home"
          />

          <BottomNavigationAction
            href="/profile"
            label="Profile"
            value="profile"
            icon={<AccountBoxIcon />}
          />
          <BottomNavigationAction label="Matches" icon={<PeopleAltIcon />} />
          <BottomNavigationAction
            href="/messages"
            label="Messages"
            value="messages"
            icon={<MessageIcon />}
          />
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
export default Browse;
