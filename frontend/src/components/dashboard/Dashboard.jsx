import React from "react";
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Avatar, TextField, Chip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import "./Dashboard.scss";

function Dashboard(props) {

  return (
    <div>

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar className="navbar-bg-color">
            <img
              src="https://i.imgur.com/Bgur1Fk.png"
              alt="OnlyFriends logo"
              style={{ width: "10rem", paddingBottom: "1rem" }}
            />
          </Toolbar>
        </AppBar>
      </Box>

      <br />

      <Box>
        <Typography variant="h5">
          Profile Setup
        </Typography>
        <Typography variant="p">
          Provide the necessary information to start finding like-minded people!
        </Typography>
      </Box>

      <br />

      <Box>
        <Typography variant="p">
          Upload a profile picture
        </Typography>
        <Avatar>
          test
        </Avatar>
      </Box>

      <br />

      <Box>
        <Typography variant="p">
          Location
        </Typography>
        <TextField label="e.g. Vancouver"></TextField>
      </Box>

      <br />

      <Box>
        <Typography variant="p">
          Bio
        </Typography>
        <TextField label="e.g. I love long walks to the fridge"></TextField>
      </Box>

      <br />

      <Box>
        <Typography variant="p">
          Upload a cover banner
        </Typography>
        <Avatar>
          test
        </Avatar>
      </Box>

      <br />

      <Box>
        <Typography variant="p">
          Select all interests/hobbies that apply
        </Typography>
        <Chip label="Archery" variant="outlined" color="primary" />
        <Chip label="Axe-throwing" variant="filled" color="primary" />
        <Chip label="Climbing" variant="outlined" color="primary" />
        <Chip label="Fencing" variant="filled" color="primary" />
        <Chip label="Kayaking" variant="outlined" color="primary" />
        <Chip label="Polevaulting" variant="outlined" color="primary" />
      </Box>

    </div>
  );
}
export default Dashboard;
