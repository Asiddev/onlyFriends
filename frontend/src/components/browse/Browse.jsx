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
  Button
} from "@mui/material";
import { MoreVert, FavoriteIcon, ShareIcon } from "@mui/icons-material";

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
            subheader="Vancouver, BC"
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
          </CardContent>
        </Card>

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
    </div>
  );
}
export default Browse;
