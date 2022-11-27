import React, { useState, useEffect } from "react";
import {storage} from '../../configAPI/firebase.js';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {v4} from 'uuid'
import axios from "axios";
import Autocomplete from "react-google-autocomplete";
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

  //Refactor state like scheduler if time permits
  const [bio, setBio] = useState("");
  let bioLimit = 100;
  const [bioLength, setBioLength] = useState(bioLimit);
  const [profileImage, setProfileImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [error, setError] = useState("");

 //Put function below into another file
  const bioUpdater = (event) => {
    setBio(event.target.value);
    let wordCount = event.target.value.length;

    setBioLength(bioLimit - wordCount);
  };

  //Put function below into another file
  const uploadImage = (pathway, image) => {
    if (image == null) {
      return "No image uploaded, cant be null";
    }
    const imageRef = ref(storage, pathway);
    return (
      uploadBytes(imageRef, image)
    .then(() => (getDownloadURL(imageRef, pathway)))
    )
  }

  //Function to post profile info into backend
  const postProfile = (event) => {
    //Make error message set states here
    event.preventDefault();
    const newData = new FormData(event.currentTarget);
    const loggedUser = JSON.parse(localStorage.getItem("user"))
    const userObj = {
      id: loggedUser.id,
      location: newData.get("Location"),
      description: newData.get("Bio"),
    }
  
    //Render error if any conditions are not met
    
    //Upload image into firebase and get url link id
    const profilePathway = `profileImages/${v4()}`;
    const bannerPathway = `bannerImages/${v4()}`;
    
    //Axios Post request to backend
    uploadImage(profilePathway, profileImage)
    .then((url) => userObj.profile_picture = url)
    .then(()=> uploadImage(bannerPathway, bannerImage))
    .then((url) => userObj.banner_picture = url)
    .then(() => axios.post("/api/users/update", userObj))
    .then(() => {console.log ("Posting was successful in dashboard")})
    .catch((err)=> {setError(err.rresponse.data)});

     
  }

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
    <Box
      component="form"
      onSubmit={postProfile}
      noValidate
      sx={{mt:1}}
    >
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
          <input type="file" name="profile_picture" onChange = {(event) => {setProfileImage(event.target.files[0])}} hidden />
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
        <Typography variant="p">Location for Test with correct texfield look</Typography>
        <Autocomplete
          className="MuiTextField-root"
          name = "Location"
          apiKey={process.env.REACT_APP_MY_API_KEY}
          style={{ width: "90%" }}
          onPlaceSelected={(place) => {
          }}
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
          name="Bio"
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
          <input type="file" name="banner_picture" onChange = {(event) => {setBannerImage(event.target.files[0])}} hidden />
        </Button>
      </Container>

      <br />

      <Container maxWidth="sm" className="chip-spacing">
        <Typography variant="p">
          Select all interests/hobbies that apply
        </Typography>

        <br />

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
        <Button variant="contained" type="submit">Save</Button>
      </Container>
    </Box>
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Copyright />
      </Box>
    </div>
  );
}
export default Dashboard;
