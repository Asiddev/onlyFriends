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
        </Link>
        {" © "}
        <Link color="inherit" href="https://github.com/nicohsfu">
          Nico Hernandez
        </Link>
        {", "}
        <Link color="inherit" href="https://github.com/Asiddev">
          Alex Sidor
        </Link>
        {", "}
        <Link color="inherit" href="https://github.com/jhssttj">
          Kevin Lee
        </Link>
        {". "}
        {new Date().getFullYear()}
      </Typography>
    </>
  );
}

export default Copyright

