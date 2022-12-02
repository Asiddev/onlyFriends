import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";
import React from "react";
import RoomIcon from "@mui/icons-material/Room";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Copyright from "../Copyright";
import { display } from "@mui/system";

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
    // setSeen((prev) => [...prev, similarUsers[page].id]);
  };

  const swipeReject = () => {
    const matchObj = {
      user_id: props.user.id,
      user_liked: similarUsers[page].id,
    };

    axios.post("api/matches/reject", matchObj);
    console.log("rejected");
    setPage((prev) => prev + 1);
  };

  return (
    <>
      <Box
        sx={{
          borderRadius: "1.75rem",
          backgroundColor: "#E4F8FF",
          // border: "3px dashed blue",
          // padding: "2rem 5rem 2rem 5rem",
          padding: "2rem",
          display: 'flex column'
        }}
      >

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          <Box
            component="img"
            sx={{ width: 55, height: 55, borderRadius: "100%" }}
            alt="Current potential match profile pic"
            src={similarUsers.length ? similarUsers[page].profile_picture : ""}
          />

          <Box sx={{ marginLeft: '1rem' }}>
            <Typography variant="h5">
              {similarUsers.length ? similarUsers[page].name : ""}
            </Typography>
          </Box>
        </Box>

        <Box
          component="img"
          sx={{ width: "100%", height: "20rem", objectFit: 'cover', marginBottom: '1rem' }}
          alt="Current potential match banner"
          src={similarUsers.length ? similarUsers[page].banner_picture : ""}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: 'center',
            height: "100%",
            // border: "3px solid red",
            margin: "0 -4rem 0 -4rem"
          }}
        >
          <Box>
            <Button onClick={swipeReject} variant="contained" sx={{ backgroundColor: "#FF8D8D" }}>
              <CloseIcon fontSize="large" />
            </Button>
          </Box>
          <Button onClick={swipeAccept} variant="contained"
            sx={{ backgroundColor: "#72AE78" }}>
            <CheckIcon fontSize="large" />
          </Button>
        </Box>

        <Box
          sx={{ marginBottom: '1rem', marginTop: "-2rem", marginLeft: "1rem" }}
        >
          <Typography variant="p">
            <RoomIcon fontSize="sm" />
            {similarUsers.length ? similarUsers[page].location : ""}
          </Typography>
        </Box>

        <Box
          sx={{ marginBottom: '1rem' }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {similarUsers.length ? similarUsers[page].description : ""}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Typography variant="h6">Interests</Typography>
        </Box>

        <Grid container className="interests-container">
          <Grid item>{profileInterests && renderInterestList}</Grid>
        </Grid>

      </Box>
    </>
  );
}

export default BrowseContent;
