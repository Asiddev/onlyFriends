import React from 'react';
import { Typography, Link } from "@mui/material";

function Copyright() {
  return (
    <>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
      >
        <Link color="inherit" href="https://github.com/Asiddev/onlyFriends">
          OnlyFriends
        </Link>{" "}
        {"© Nico Hernandez, Alex Sidor, Kevin Lee. "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </>
  );
}

export default Copyright

