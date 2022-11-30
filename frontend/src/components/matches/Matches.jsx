
import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  CssBaseline,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MessageIcon from "@mui/icons-material/Message";
import LogoutIcon from "@mui/icons-material/Logout";
import "./Matches.scss";
import BottomNav from "../bottomnav/BottomNav";
function Matches() {

  return (
    <>
    {/* everything on this page is in this main Box, think of it as a fragment */}
    <Box sx={{ pb: 7 }}>
        <CssBaseline />
        {/* TOP NAV - TO BE REFACTORED */}
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

        {/* BOTTOM NAV - TO BE REFACTORED */}
        <BottomNav />
    </Box>
    </>
  );
}
export default Matches;
