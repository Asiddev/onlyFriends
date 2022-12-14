import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import MessageIcon from "@mui/icons-material/Message";
import DeleteIcon from "@mui/icons-material/Delete";

function MatchesContent() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [matchUpdate, setMatchUpdate] = useState(false);

  useEffect(() => {
    axios
      .get(`api/matches/${JSON.parse(localStorage.getItem("user")).id}`)
      .then((matches) => {
        setMatchUpdate(false);

        setMatches(matches.data);
      });
  }, [matchUpdate]);

  const goToMsg = (event) => {
    const email = event.currentTarget.value;
    const matchId = event.currentTarget.getAttribute("matchid");
    navigate("/messages", { state: { email: email, matchId: matchId } });
  };

  const deleteMatch = (event) => {
    event.preventDefault();

    const loggedInUser = JSON.parse(localStorage.getItem("user")).id;
    const userToBeDeleted = Number(event.currentTarget.value);

    const userObj = {
      user_id: loggedInUser,
      user_liked: userToBeDeleted,
    };

    axios.post("api/matches/delete", userObj);
    setMatchUpdate(true);
    navigate("/matches");

    // axios.post(`api/matches/delete`, userObj)
    //   .then(() => {

    //     // currently not working
    //     setTimeout(() => {
    //       navigate("/profile");
    //     }, 2000);

    //   });
  };

  const matchesList = matches.map((match) => {
    return (
      <React.Fragment key={match.id}>
        <Box
          sx={{
            marginBottom: "1rem",
            padding: "1rem",
            borderRadius: "1rem",
            backgroundColor: "#4285F4",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              sx={{ width: 50, height: 50, borderRadius: "100%" }}
              alt="OnlyFriends logo"
              src={match.profile_picture}
            />

            <Box>
              <Typography
                variant="p"
                fontWeight="light"
                key={match.id}
                sx={{ marginLeft: "1rem" }}
              >
                {match.name}
              </Typography>
            </Box>
          </Box>

          <Box>
            <Button
              variant="contained"
              color="secondary"
              test="test"
              value={match.email}
              matchid={match.id}
              sx={{ marginLeft: "3rem", marginRight: "1rem" }}
              onClick={goToMsg}
            >
              <MessageIcon />
            </Button>
            <Button
              value={match.id}
              variant="contained"
              color="secondary"
              onClick={deleteMatch}
            >
              <DeleteIcon />
            </Button>
          </Box>
        </Box>
      </React.Fragment>
    );
  });

  return (
    <>
      <Box
        sx={{
          borderRadius: "1.75rem",
          backgroundColor: "#E4F8FF",
          padding: "2rem",
        }}
      >
        <Typography
          variant="h4"
          color="#008CCF"
          align="center"
          marginBottom="2rem"
        >
          Matches
        </Typography>

        <Typography variant="h5">{matchesList}</Typography>
      </Box>
    </>
  );
}

export default MatchesContent;
