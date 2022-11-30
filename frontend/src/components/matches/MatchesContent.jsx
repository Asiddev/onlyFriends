import React from 'react';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import { useEffect, useState } from 'react';
import axios from "axios";
import MessageIcon from "@mui/icons-material/Message";
import DeleteIcon from '@mui/icons-material/Delete';

function MatchesContent() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    axios.get(`api/matches/${JSON.parse(localStorage.getItem("user")).id}`)
      .then((matches) => {
        // console.log("matches here >>>>>", matches);
        // console.log("matches.data", matches.data);
        setMatches(matches.data);
        console.log("matches1", matches);
      });
  }, []);

  const matchesList = matches.map((match) => {
    return (
      <>
        <Box border="3px solid blue" sx={{ marginBottom:"1rem", padding:"1rem"}}>
          <Box
            component="img"
            sx={{ width: 150 }}
            alt="OnlyFriends logo"
            src={match.profile_picture}
          />
          <Typography variant='p' key={match.id}>{match.name}</Typography>
          <Button variant={'contained'}>
            <MessageIcon />
          </Button>

          <Button variant={'contained'}>
            <DeleteIcon />
          </Button>
        </Box>
      </>
    );
  });

  return (
    <>
      <Box
        sx={{
          width: 566,
          borderRadius: "1.75rem",
          backgroundColor: "lightblue",
          // border: "3px solid red",
          padding: "2rem"
        }}
      >
        {/* <Card
          variant="outlined"
          sx={{
            border: "3px solid pink",
            maxWidth: 420,
          }}
        >
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Word of the Day
            </Typography>
            <Typography variant="h5" component="div">
              be•nev•o•lent
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              adjective
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card> */}

        <Typography variant='h5'>
          {matchesList}
        </Typography>
      </Box>
    </>
  );
}

export default MatchesContent;