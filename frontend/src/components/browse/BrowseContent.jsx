import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import RoomIcon from "@mui/icons-material/Room";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Copyright from "../Copyright";

function BrowseContent(props) {
  const {
    page,
    loading,
    similarUsers,
    setEndOfList,
    setPage,
    setSeen,
    profileInterests,
    renderInterestList,
  } = props;

  const swipeAccept = () => {
    const matchObj = {
      user_id: props.user.id,
      user_liked: similarUsers[page].id,
    };
    axios.post("api/matches/accept", matchObj);
    console.log("inside swipe", page);
    let lookedAt = [];
    lookedAt.push(similarUsers[page].id);

    console.log(loading, page, similarUsers.length - 1);
    if (page === similarUsers.length - 1) {
      console.log("papa");
      setEndOfList(true);
    }

    setPage((prev) => prev + 1);
    setSeen((prev) => [...prev, similarUsers[page].id]);
  };

  const swipeReject = () => {
    const matchObj = {
      user_id: props.user.id,
      user_liked: similarUsers[page].id,
    };

    axios.post("api/matches/reject", matchObj);
    setPage((prev) => prev - 1);
  };

  return (
    <>
      <Card
        sx={{ maxWidth: "100%", height: "max-content" }}
        className="block padding"
        style={{
          backgroundColor: "#E4F8FF",
          borderRadius: "1.75rem",
          paddingBottom: "0",
        }}
      >
        <Button class="noselect" id="button-left" onClick={swipeReject}>
          <CloseIcon fontSize="large" />
        </Button>
        <Button class="noselect" id="button-right" onClick={swipeAccept}>
          <CheckIcon fontSize="large" />
        </Button>

        <CardHeader
          className="top-container-name"
          avatar={
            <Avatar
              src={
                similarUsers.length ? similarUsers[page].profile_picture : ""
              }
            ></Avatar>
          }
          title={similarUsers.length ? similarUsers[page].name : ""}
          // subheader={props.user.location}
        />
        <CardMedia
          sx={{ mx: "auto", width: 450, height: 300, boxShadow: 5 }}
          component="img"
          image={similarUsers.length ? similarUsers[page].banner_picture : ""}
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
      <Copyright />
    </>
  );
}

export default BrowseContent;
