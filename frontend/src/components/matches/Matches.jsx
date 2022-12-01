import React from "react";
import {
  Box,
  CssBaseline
} from "@mui/material";

import "./Matches.scss";
import BottomNav from "../bottomnav/BottomNav";
import TopNav from "../topnav/TopNav";
import MatchesContent from "./MatchesContent";
import Copyright from "../Copyright";

function Matches(props) {
  return (
    <>
      {/* everything on this page is in this main Box, think of it as a fragment */}
      <Box sx={{
        pb: 10,
        // border: "3px solid red"
      }}>
        <CssBaseline />
        <TopNav />

        {/* THIS IS THE MAIN BODY - BETWEEN THE TOP NAV AND BOTTOM NAV */}
        <MatchesContent />

        <br />
        <Copyright />
        <BottomNav value={props.value} setValue={props.setValue} />
      </Box>
    </>
  );
}

export default Matches;
