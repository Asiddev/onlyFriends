import React from "react";
import { Typography, Box } from "@mui/material";

function EndAnimation() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Typography variant="h4">
          No more users in your area!
        </Typography>
        <Typography variant="p">
          Please check back after some time
        </Typography>
        <Box
          component="img"
          sx={{
            // border: "3px solid red",
          }}
          alt="Current potential match profile pic"
          src="https://media.tenor.com/2VBRsBlhEekAAAAd/travolta-confused.gif"
        />
      </Box>
    </>
  );
}

export default EndAnimation;
