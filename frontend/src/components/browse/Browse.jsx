import * as React from "react";
import { red } from "@mui/material/colors";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  IconButton,
  Typography,
  Link,
  CssBaseline,
  Box,
  AppBar,
  Toolbar,
  Container,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Grid,
  Paper,
  BottomNavigationAction,
  BottomNavigation,
} from "@mui/material";
import { MoreVert, ShareIcon } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RestoreIcon from "@mui/icons-material/Restore";
import ArchiveIcon from "@mui/icons-material/Archive";

import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MessageIcon from "@mui/icons-material/Message";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © Nico Hernandez, Alex Sidor, Kevin Lee "}
      <Link color="inherit" href="https://github.com/Asiddev/onlyFriends">
        OnlyFriends
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Browse(props) {
  const [value, setValue] = React.useState(0);
  const [profileInterests, setProfileInterest] = useState([]);

  useEffect(() => {
    axios.get(`/api/user_interests/${props.user.id}`).then((data) => {
      console.log(props.user);
      setProfileInterest([...data.data]);
    });
  }, []);

  const renderInterestList = profileInterests.map((interest) => {
    return (
      <Button key={interest.id} variant="contained" sx={{ marginRight: 1 }}>
        {interest.name}
      </Button>
    );
  });

  console.log(profileInterests);

  return (
    <div>
      <CssBaseline />

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

      {/* this is the side nav */}
      {/* <List>
        {['Profile', 'Home', 'Matches', 'Messages', 'Logout'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}

      {/* this is the card */}
      <Container maxWidth="sm">
        <img src={props.profilePicture} alt="" />
        <Card sx={{ maxWidth: "100%" }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[300] }}>
                <img src={props.profileImage} alt="" />
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVert />
              </IconButton>
            }
            title={props.user.name}
            subheader={props.user.location}
          />
          <CardMedia
            component="img"
            image={props.user.banner_picture}
            alt="Max"
          />
          <CardContent className="center">
            <Typography variant="body2" color="text.secondary">
              {props.user.description}
            </Typography>

            {/* their selected interests */}
            <br />

            <Grid container>
              <Grid item>{profileInterests && renderInterestList}</Grid>
            </Grid>
          </CardContent>
        </Card>

        <br />
        <br />

        <Button variant="contained">Yes</Button>

        <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
          <Copyright />
        </Box>
      </Container>

      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction href="/" label="Home" icon={<HomeIcon />} />

          <BottomNavigationAction
            href="/profile"
            label="Profile"
            icon={<AccountBoxIcon />}
          />
          <BottomNavigationAction label="Matches" icon={<PeopleAltIcon />} />
          <BottomNavigationAction label="Messages" icon={<MessageIcon />} />
          <BottomNavigationAction label="Logout" icon={<LogoutIcon />} />
        </BottomNavigation>
      </Paper>
    </div>
  );
}
export default Browse;
