import * as React from "react";
import { red } from "@mui/material/colors";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  Typography,
  CssBaseline,
  Box,
  AppBar,
  Toolbar,
  Container,
  Button,
  Grid,
} from "@mui/material";
import "./Browse.scss";
import RoomIcon from "@mui/icons-material/Room";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../bottomnav/BottomNav";
import Copyright from "../Copyright";

function Browse(props) {
  const [profileInterests, setProfileInterest] = useState([]);
  const [similarUsers, setSimilarUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchSimUsers = async function() {
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

  const swipeAccept = () => {
    const matchObj = {
      user_id: props.user.id,
      user_liked: similarUsers[page].id
    };
    axios.post("api/matches/accept", matchObj);
    setPage((prev) => prev + 1);
  };

  const swipeReject = () => {
    const matchObj = {
      user_id: props.user.id,
      user_liked: similarUsers[page].id
    };
    axios.post("api/matches/reject", matchObj);
    setPage((prev) => prev + 1);
  };

  console.log(page);

  console.log(profileInterests);

  return (
    <>
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
                onClick={swipeReject}
              >
                <CloseIcon fontSize="large" />
              </Button>
              <Button
                class="noselect"
                id="button-right"
                onClick={swipeAccept}
              >
                <CheckIcon fontSize="large" />
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
            <br />
            <Copyright />
          </div>
          <BottomNav
            value={props.value}
            setValue={props.setValue}
            setCurrentUser={props.setCurrentUser}
          />
        </Container>
      )}
    </>
  );
}
export default Browse;
