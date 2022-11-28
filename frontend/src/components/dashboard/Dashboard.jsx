import React, { useState, useEffect, useRef } from "react";
import ReactFileReader from "react-file-reader";
import { storage } from "../../configAPI/firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Autocomplete from "react-google-autocomplete";
import {
  AppBar,
  Alert,
  AlertTitle,
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
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import "./Dashboard.scss";
import ItemList from "../../components/dashboard/ItemList";
import "../../styles/animations.scss";

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
  const [active, setActive] = useState(false);

  const [profilePreview, setProfilePreview] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //Function to logout and clear cookie and storage
  const logOut = (event) => {
    event.preventDefault();
    axios.get("/api/users/logout").then(() => {
      localStorage.removeItem("user");
      props.setCurrentUser(null);
      navigate("/login");
    });
  };

  //Put function below into another file
  const bioUpdater = (event) => {
    setBio(event.target.value);
    let wordCount = event.target.value.length;

    setBioLength(bioLimit - wordCount);
  };

  //Put function below into another file
  const uploadImage = (pathway, image) => {
    const imageRef = ref(storage, pathway);
    return uploadBytes(imageRef, image).then(() =>
      getDownloadURL(imageRef, pathway)
    );
  };

  //Function to read changed image and preview it
  const profileImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    setProfileImage(file);
    reader.onload = (event) => {
      setProfilePreview(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const bannerImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    setBannerImage(file);
    reader.onload = (event) => {
      setBannerPreview(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  //Function to post profile info into backend
  const postProfile = (event) => {
    //Make error message set states here
    event.preventDefault();
    setError("");
    const newData = new FormData(event.currentTarget);
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    const userObj = {
      id: loggedUser.id,
      location: newData.get("Location"),
      description: newData.get("Bio"),
    };

    //Render error if any conditions are not met
    if (userObj.description.length > 100) {
      setError("Bio exceeds 100 char limit");
      return;
    }
    if (!userObj.location) {
      setError("Location must be filled");
      return;
    }
    if (!profileImage || !bannerImage) {
      setError("Please upload image to express yourself");
      return;
    }
    //Upload image into firebase and get url link id
    const profilePathway = `profileImages/${v4()}`;
    const bannerPathway = `bannerImages/${v4()}`;

    //Axios Post request to backend
    uploadImage(profilePathway, profileImage)
      .then((url) => (userObj.profile_picture = url))
      .then(() => uploadImage(bannerPathway, bannerImage))
      .then((url) => (userObj.banner_picture = url))
      .then(() => axios.post("/api/users/update", userObj))
      .then(() => {
        console.log("Posting was successful in dashboard");
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

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
      <Box component="form" onSubmit={postProfile} noValidate sx={{ mt: 1 }}>
        <Container maxWidth="sm">
          <Typography
            variant="h4"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Profile Setup
          </Typography>
          <Typography
            variant="p"
            align="center"
            color="text.secondary"
            paragraph
          >
            Provide the necessary information to start finding like-minded
            people!
          </Typography>
        </Container>
        <div className="center">
          {error && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {error}
            </Alert>
          )}
        </div>
        <br />

        <Container maxWidth="sm" className="center">
          <div className="center">
            <Typography variant="p">Upload a profile picture</Typography>
            <Button variant="contained" component="label">
              Upload File
              <input
                type="file"
                accept="image/*"
                name="profile_picture"
                onChange={profileImageChange}
                hidden
              />
            </Button>
            <br />
            {profileImage && (
              <img
                className="circle-img"
                src={profilePreview}
                alt="profile pic"
              />
            )}
          </div>
        </Container>

        <br />

        <Container maxWidth="sm">
          <div className="center">
            <Typography variant="p">Location</Typography>
          </div>
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
          <div className="center">
            <Typography variant="p">
              <Autocomplete
                className="MuiTextField-root"
                name="Location"
                apiKey={process.env.REACT_APP_MY_API_KEY}
                style={{ width: "300px", height: "55px" }}
                onPlaceSelected={(place) => {}}
                options={{
                  types: ["(regions)"],
                  componentRestrictions: { country: "ca" },
                }}
              />
            </Typography>
          </div>
        </Container>

        <br />

        <Container maxWidth="sm">
          <div className="center">
            <Typography variant="p">Bio</Typography>
            <TextField
              style={{ width: "755px", height: "55px" }}
              label="Bio"
              name="Bio"
              value={bio}
              onChange={bioUpdater}
              placeholder="e.g. I love long walks to the fridge"
            ></TextField>
            <Typography
              className={bioLength >= 0 ? "safe" : "danger"}
              variant="h6"
            >
              {bioLength}
            </Typography>
          </div>
        </Container>

        <br />

        <Container maxWidth="sm">
          <div className="center">
            <Typography variant="p">Upload a cover banner</Typography>
            <Button variant="contained" component="label">
              Upload File
              <input
                type="file"
                accept="image/*"
                name="banner_picture"
                onChange={bannerImageChange}
                hidden
              />
            </Button>
            <div>
              {bannerImage && (
                <img
                  className="rectangle-img"
                  src={bannerPreview}
                  alt="banner pic"
                />
              )}
            </div>
          </div>
        </Container>

        <br />

        <Container maxWidth="sm" className="chip-spacing">
          <div className="center">
            <Typography variant="p">
              Select all interests/hobbies that apply
            </Typography>

            <br />
            <FormControl
              onSubmit={(e) => {
                console.log(e);
              }}
            >
              <ItemList />
            </FormControl>
          </div>
        </Container>

        <br />

        <Container maxWidth="sm">
          <div className="center">
            <Button variant="contained" type="submit">
              Save
            </Button>
          </div>
        </Container>
      </Box>

      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        {/* Test for Alex logout */}
        <div className="center">
          <Button onClick={logOut}> Logout now</Button>
        </div>
        <Copyright />
      </Box>
    </div>
  );
}
export default Dashboard;
