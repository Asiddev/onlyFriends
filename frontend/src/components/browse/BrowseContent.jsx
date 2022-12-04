import { Button, Grid, Typography, Box } from "@mui/material";
import axios from "axios";
import React, {useEffect} from "react";
import RoomIcon from "@mui/icons-material/Room";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

function BrowseContent(props) {
  const {
    page,
    similarUsers,
    setEndOfList,
    setLoading,
    setPage,
    profileInterests,
    renderInterestList,
  } = props;

  const swipeAccept = () => {
    const matchObj = {
      user_id: props.user.id,
      user_liked: similarUsers[page].id,
    };
    axios.post("api/matches/accept", matchObj);

    if (page === similarUsers.length - 1) {
      setEndOfList(true);
    }

    setLoading(true);
    setPage((prev) => prev + 1);
    
  };

  const swipeReject = () => {
    const matchObj = {
      user_id: props.user.id,
      user_liked: similarUsers[page].id,
    };
    axios.post("api/matches/reject", matchObj);

    if (page === similarUsers.length - 1) {
      setEndOfList(true);
    }

    setLoading(true);
    setPage((prev) => prev + 1);
  };

  return (
    <>
      <Box
        sx={{
          borderRadius: "1.75rem",
          backgroundColor: "#E4F8FF",
          padding: "2rem",
          display: "flex column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <Box
            component="img"
            sx={{ width: 55, height: 55, borderRadius: "100%" }}
            alt="Current potential match profile pic"
            src={similarUsers.length ? similarUsers[page].profile_picture : ""}
          />

          <Box sx={{ marginLeft: "1rem" }}>
            <Typography variant="h5">
              {similarUsers.length ? similarUsers[page].name : ""}
            </Typography>
          </Box>
        </Box>

        <Box
          component="img"
          sx={{
            width: "100%",
            height: "20rem",
            objectFit: "contain",
            marginBottom: "1rem",
          }}
          alt="Current potential match banner"
          src={similarUsers.length ? similarUsers[page].banner_picture : ""}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
            height: "100%",
            // border: "3px solid red",
            margin: "0 -4rem 0 -4rem",
          }}
        >
          <Box>
            <Button
              onClick={swipeReject}
              variant="contained"
              sx={{ backgroundColor: "#FF8D8D" }}
            >
              <CloseIcon fontSize="large" />
            </Button>
          </Box>
          <Button
            onClick={swipeAccept}
            variant="contained"
            sx={{ backgroundColor: "#72AE78" }}
          >
            <CheckIcon fontSize="large" />
          </Button>
        </Box>

        <Box
          sx={{ marginBottom: "1rem", marginTop: "-2rem", marginLeft: "1rem" }}
        >
          <Typography variant="p">
            <RoomIcon fontSize="sm" />
            {similarUsers.length ? similarUsers[page].location : ""}
          </Typography>
        </Box>

        <Box sx={{ marginBottom: "1rem" }}>
          <Typography variant="body2" color="text.secondary">
            {similarUsers.length ? similarUsers[page].description : ""}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
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
