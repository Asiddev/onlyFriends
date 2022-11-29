import * as React from 'react';
import { red } from '@mui/material/colors';
import {
  Card, CardHeader, CardMedia, CardContent, Avatar, IconButton, Typography,
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
  BottomNavigation
} from "@mui/material";
import { MoreVert, ShareIcon } from "@mui/icons-material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import RestoreIcon from '@mui/icons-material/Restore';
import ArchiveIcon from '@mui/icons-material/Archive';

import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MessageIcon from '@mui/icons-material/Message';
import LogoutIcon from '@mui/icons-material/Logout';

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
        <Card sx={{ maxWidth: "100%" }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[300] }}
              >
                Rs
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVert />
              </IconButton>
            }
            title="First Last"
            subheader="Somecity, Netherlands"
          />
          <CardMedia
            component="img"
            image="https://www.motorsportweek.com/wp-content/uploads/2021/06/jm2120ju606.jpg"
            alt="Max"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              This is the bio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id laoreet ipsum. Phasellus tellus nisl, varius in maximus bibendum, eleifend sit amet neque. Mauris dictum tellus sed ultrices finibus. Nulla in ipsum ac nisl feugiat maximus. Sed in nisl vehicula diam lobortis efficitur.
            </Typography>

            {/* their selected interests */}
            <br />
            <Grid container>
              <Grid item>
                <Button
                  // key={interest.id}
                  variant="contained"
                  // onClick={handleClick}
                  sx={{ marginRight: 1 }}
                // value={interest.id}
                >
                  Racing
                </Button>
                <Button
                  // key={interest.id}
                  variant="contained"
                  // onClick={handleClick}
                  sx={{ marginRight: 1 }}
                // value={interest.id}
                >
                  Skiing
                </Button>
                <Button
                  // key={interest.id}
                  variant="contained"
                  // onClick={handleClick}
                  sx={{ marginRight: 1 }}
                // value={interest.id}
                >
                  Videogaming
                </Button>
              </Grid>
            </Grid>
          </CardContent>


        </Card>

        <br /><br />

        <Button variant="outlined">
          No
        </Button>

        <Button variant="contained">
          Yes
        </Button>

        <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
          <Copyright />
        </Box>

      </Container>

      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction label="Profile" icon={<AccountBoxIcon />} />
          <BottomNavigationAction label="Matches" icon={<PeopleAltIcon />} />
          <BottomNavigationAction label="Messages" icon={<MessageIcon />} />
          <BottomNavigationAction label="Logout" icon={<LogoutIcon />} />
        </BottomNavigation>
      </Paper>

    </div>
  );
}
export default Browse;
