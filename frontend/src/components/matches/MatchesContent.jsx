import React from 'react';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";

function MatchesContent() {
  return (
    <>
      <Box
        sx={{
          width: 566,
          height: 1400,
          borderRadius: "1.75rem",
          backgroundColor: "lightblue",
          border: "3px solid red",
        }}
      >
        <Card
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
        </Card>
      </Box>
    </>
  );
}

export default MatchesContent;