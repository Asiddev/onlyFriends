import React from "react";
import { Box, AppBar, Toolbar } from "@mui/material";

function TopNav(props) {
  return (
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
  );
}

export default TopNav;