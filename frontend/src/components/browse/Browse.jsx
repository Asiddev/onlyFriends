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
import RoomIcon from "@mui/icons-material/Room";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

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
      <Link color="inherit" href="https://github.com/Asiddev/onlyFriends">
        OnlyFriends
      </Link>{" "}
      {"© Nico Hernandez, Alex Sidor, Kevin Lee. "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Browse(props) {
  const [profileInterests, setProfileInterest] = useState([]);
  const [similarUsers, setSimilarUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchSimUsers = async function () {
    if (props.user) {
      setLoading(true);
      const data = await axios.get(`/api/users/${props.user.id}/common`);

      console.log(data);
      setSimilarUsers(data.data);
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    axios
      .get(`api/users/${JSON.parse(localStorage.getItem("user")).id}`)
      .then((result) => {
        const user = result.data[0];
        props.setCurrentUser(user);
      });
    fetchSimUsers();
  }, [page]);

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
        sx={{ margin: 0.3 }}
      >
        <Typography fontSize="0.7rem">{interest.name}</Typography>
      </Button>
    );
  });

  console.log(page);

  console.log(profileInterests);

  return (
    <div>
      <section className="sticky">
        <div className="bubbles">
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>

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

          {loading ? (
            <div className="loader">
              <div className="inner one"></div>
              <div className="inner two"></div>
              <div className="inner three"></div>
            </div>
          ) : (
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
                  <Button
                    class="noselect"
                    id="button-left"
                    onClick={(e) => {
                      if (page >= similarUsers.length) {
                        setPage(0);
                      }
                      setPage((prev) => prev - 1);
                    }}
                  >
                    {/* <span class="text"></span>
                  <span class="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-arrow-down-left-circle-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-5.904-2.803a.5.5 0 1 1 .707.707L6.707 10h2.768a.5.5 0 0 1 0 1H5.5a.5.5 0 0 1-.5-.5V6.525a.5.5 0 0 1 1 0v2.768l4.096-4.096z" />
                    </svg>
                  </span> */}
                    <CloseIcon fontSize="large" />
                  </Button>
                  <Button
                    class="noselect"
                    id="button-right"
                    onClick={(e) => {
                      setPage((prev) => prev + 1);
                    }}
                  >
                    <CheckIcon fontSize="large" />
                    {/* <span class="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-arrow-up-right-circle-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 8a8 8 0 1 0 16 0A8 8 0 0 0 0 8zm5.904 2.803a.5.5 0 1 1-.707-.707L9.293 6H6.525a.5.5 0 1 1 0-1H10.5a.5.5 0 0 1 .5.5v3.975a.5.5 0 0 1-1 0V6.707l-4.096 4.096z" />
                    </svg>
                  </span> */}
                  </Button>

                  <CardHeader
                    className="top-container-name"
                    avatar={
                      <Avatar
                        src={
                          similarUsers.length
                            ? similarUsers[page].profile_picture
                            : ""
                        }
                        sx={{ bgcolor: red[300] }}
                      ></Avatar>
                    }
                    title={similarUsers.length ? similarUsers[page].name : ""}
                    // subheader={props.user.location}
                  />
                  <CardMedia
                    sx={{ mx: "auto", width: 450, height: 300, boxShadow: 5 }}
                    component="img"
                    image={
                      similarUsers.length
                        ? similarUsers[page].banner_picture
                        : ""
                    }
                    alt="banner_picture"
                  />
                  <br />
                  <Typography variant="h5">
                    <RoomIcon />
                    {similarUsers.length ? similarUsers[page].location : ""}
                  </Typography>
                  <br />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className="center wrap"
                  >
                    {similarUsers.length ? similarUsers[page].description : ""}
                  </Typography>
                  <br />
                  <Typography variant="h5">Interests:</Typography>
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
          )}
        </div>
      </section>

      <BottomNav
        value={props.value}
        setValue={props.setValue}
        setCurrentUser={props.setCurrentUser}
      />
    </div>
  );
}
export default Browse;
