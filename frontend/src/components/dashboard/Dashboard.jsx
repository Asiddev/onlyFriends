import React, { useState, useEffect } from "react";
import Autocomplete from "react-google-autocomplete";
import { usePlacesWidget } from "react-google-autocomplete";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  TextField,
  Chip,
  Card,
  CssBaseline,
  Container,
  Link,
} from "@mui/material";
import "./Dashboard.scss";

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

function Dashboard(props) {
  const [bio, setBio] = useState("");
  let bioLimit = 100;
  const [bioLength, setBioLength] = useState(bioLimit);

  const bioUpdater = (event) => {
    setBio(event.target.value);
    let wordCount = event.target.value.length;

    setBioLength(bioLimit - wordCount);
  };

  const [variant, setVariant] = useState(false);

  return (
    <div>
      <CssBaseline />

      <Box marginBottom={10}>
        <AppBar>
          <Toolbar className="navbar-logo">
            {/* <img
              src="https://i.imgur.com/Bgur1Fk.png"
              alt="OnlyFriends logo"
              style={{ width: "10rem", alignItems: "center", justifyContent: "center" }}
            /> */}
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
        <Typography
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Profile Setup
        </Typography>
        <Typography variant="p" align="center" color="text.secondary" paragraph>
          Provide the necessary information to start finding like-minded people!
        </Typography>
      </Container>

      <br />

      <Container maxWidth="sm">
        <Typography variant="p">Upload a profile picture</Typography>
        <Button variant="contained" component="label">
          Upload File
          <input type="file" hidden />
        </Button>
      </Container>

      <br />

      <Container maxWidth="sm">
        <Typography variant="p">Textfield for reference</Typography>
        <TextField label="Location" placeholder="e.g. Narnia"></TextField>
      </Container>

      {/* Test for Kevin location */}
      {/* <Container maxWidth="sm">
        <Typography variant="p">Location for Test</Typography>
        <Autocomplete
          apiKey={process.env.REACT_APP_MY_API_KEY}
          style={{ width: "90%" }}
          onPlaceSelected={(place) => {
          }}
          options={{
            types: ["(regions)"],
            componentRestrictions: { country: "ca" },
          }}

        />
      </Container> */}

      {/* Test with proper textfield look */}
      <Container maxWidth="sm">
        <Typography variant="p">
          Location for Test with correct texfield look
        </Typography>
        <Autocomplete
          className="MuiTextField-root"
          apiKey={process.env.REACT_APP_MY_API_KEY}
          style={{ width: "90%" }}
          onPlaceSelected={(place) => {}}
          options={{
            types: ["(regions)"],
            componentRestrictions: { country: "ca" },
          }}
        />
      </Container>

      <br />

      <Container maxWidth="sm">
        <Typography variant="p">Bio</Typography>
        <TextField
          label="Bio"
          value={bio}
          onChange={bioUpdater}
          placeholder="e.g. I love long walks to the fridge"
        ></TextField>
        <Typography className={bioLength > 0 ? "safe" : "danger"} variant="h6">
          {bioLength}
        </Typography>
      </Container>

      <br />

      <Container maxWidth="sm">
        <Typography variant="p">Upload a cover banner</Typography>
        <Button variant="contained" component="label">
          Upload File
          <input type="file" hidden />
        </Button>
      </Container>

      <br />

      <Container maxWidth="sm" className="chip-spacing">
        <Typography variant="p">
          Select all interests/hobbies that apply
        </Typography>

        <br />

        <Chip
          variant={variant ? "outlined" : "filled"}
          label="Archery"
          color="primary"
          onClick={() => setVariant(!variant)}
        />
        <Chip label="Axe-throwing" variant="filled" color="primary" />
        <Chip label="Climbing" variant="filled" color="primary" />
        <Chip label="Fencing" variant="filled" color="primary" />
        <Chip label="Kayaking" variant="outlined" color="primary" />
        <Chip label="Polevaulting" variant="outlined" color="primary" />
        <Chip label="Archery" variant="filled" color="primary" />
        <Chip label="Axe-throwing" variant="outlined" color="primary" />
        <Chip label="Climbing" variant="outlined" color="primary" />
        <Chip label="Fencing" variant="filled" color="primary" />
        <Chip label="Kayaking" variant="filled" color="primary" />
        <Chip label="Polevaulting" variant="outlined" color="primary" />
        <Chip label="Archery" variant="outlined" color="primary" />
        <Chip label="Axe-throwing" variant="filled" color="primary" />
        <Chip label="Climbing" variant="filled" color="primary" />
        <Chip label="Fencing" variant="filled" color="primary" />
        <Chip label="Kayaking" variant="outlined" color="primary" />
        <Chip label="Polevaulting" variant="outlined" color="primary" />
        <Chip label="Archery" variant="filled" color="primary" />
        <Chip label="Axe-throwing" variant="outlined" color="primary" />
        <Chip label="Climbing" variant="outlined" color="primary" />
        <Chip label="Fencing" variant="filled" color="primary" />
        <Chip label="Kayaking" variant="filled" color="primary" />
        <Chip label="Polevaulting" variant="outlined" color="primary" />
        <Chip label="Archery" variant="outlined" color="primary" />
        <Chip label="Axe-throwing" variant="filled" color="primary" />
        <Chip label="Climbing" variant="filled" color="primary" />
        <Chip label="Fencing" variant="filled" color="primary" />
        <Chip label="Kayaking" variant="outlined" color="primary" />
        <Chip label="Polevaulting" variant="outlined" color="primary" />
        <Chip label="Archery" variant="filled" color="primary" />
        <Chip label="Axe-throwing" variant="outlined" color="primary" />
        <Chip label="Climbing" variant="outlined" color="primary" />
        <Chip label="Fencing" variant="filled" color="primary" />
        <Chip label="Kayaking" variant="filled" color="primary" />
        <Chip label="Polevaulting" variant="outlined" color="primary" />
      </Container>

      <br />

      <Container maxWidth="sm">
        <Button variant="contained">Save</Button>
      </Container>

      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Copyright />
      </Box>
    </div>
  );
}
export default Dashboard;
