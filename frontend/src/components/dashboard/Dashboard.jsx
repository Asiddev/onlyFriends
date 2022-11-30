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
  CssBaseline,
  Container,
  Link,
  FormControl,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import "./Dashboard.scss";
import ItemList from "../../components/dashboard/ItemList";
import "../../styles/animations.scss";
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MessageIcon from "@mui/icons-material/Message";
import LogoutIcon from "@mui/icons-material/Logout";
import BottomNav from "../bottomnav/BottomNav.jsx";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      <Link color="inherit" href="https://github.com/Asiddev/onlyFriends">
        OnlyFriends
      </Link>{" "}
      {"© Nico Hernandez, Alex Sidor, Kevin Lee. "}
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

  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const [bannerImage, setBannerImage] = useState(null);
  const [active, setActive] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);

  const [error, setError] = useState(null);

  const [picked, setPicked] = useState([]);
  const [userInterest, loadUserInterest] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      axios.get(`api/users/${JSON.parse(localStorage.getItem("user")).id}`),
      axios.get(
        `api/user_interests/${JSON.parse(localStorage.getItem("user")).id}`
      ),
    ]).then((all) => {
      const user = all[0].data[0]; // This returns an object
      const userInterests = all[1].data; // This returns an array

      props.setCurrentUser(user);
      !user.description ? setBio("") : setBio(user.description);
      setProfilePreview(user.profile_picture);
      setBannerPreview(user.banner_picture);
      setLocation(user.location);

      //Set user interest to render.
      let interestArray = [];
      for (const interest of userInterests) {
        interestArray.push(interest.interest_id);
      }
      setPicked(interestArray);
    });
  }, []);

  //Function to logout and clear cookie and storage

  //Put function below into another file
  const bioUpdater = (event) => {
    setBio(event.target.value);
    let wordCount = event.target.value.length;

    setBioLength(bioLimit - wordCount);
  };

  //Put function below into another file
  const uploadImage = (pathway, image) => {
    const imageRef = ref(storage, pathway);
    if (!image) {
      return null;
    }
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
      interests: picked,
    };

    //Render error if any conditions are not met
    if (bio.length > 100) {
      setError("Bio exceeds 100 char limit");
      return;
    }
    if (!userObj.location) {
      setError("Location must be filled");
      return;
    }

    //Upload image into firebase and get url link id
    const profilePathway = `profileImages/${v4()}`;
    const bannerPathway = `bannerImages/${v4()}`;

    //Axios Post request to backend

    axios.post("/api/user_interests", userObj);

    Promise.all([
      uploadImage(profilePathway, profileImage),
      uploadImage(bannerPathway, bannerImage),
    ])
      .then((imgUrl) => {
        userObj.profile_picture = null;
        userObj.banner_picture = null;
        if (imgUrl[0] !== null) {
          userObj.profile_picture = imgUrl[0];
        }
        if (imgUrl[1] !== null) {
          userObj.banner_picture = imgUrl[1];
        }
      })
      .then(() => {
        axios.post("/api/users/update", userObj);
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.response.data);
      });

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 2500);
  };
  return (
    <>
      {loading ? (
        <>
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
          <span className="center" color="primary">
            Saving...
          </span>
          <div className="book">
            <div className="book__pg-shadow"></div>
            <div className="book__pg"></div>
            <div className="book__pg book__pg--2"></div>
            <div className="book__pg book__pg--3"></div>
            <div className="book__pg book__pg--4"></div>
            <div className="book__pg book__pg--5"></div>
          </div>
        </>
      ) : (
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
            sx={{ mt: 1 }}
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

            <Container maxWidth="sm" className="text-center">
              <div className="d-flex">
                <Typography variant="p">Upload a profile picture</Typography>
                <img
                  className="circle-img"
                  src={profilePreview}
                  alt="profile pic"
                />
                <Button variant="outlined" component="label" color="secondary">
                  Upload Photo
                  <input
                    type="file"
                    accept="image/*"
                    name="profile_picture"
                    onChange={profileImageChange}
                    hidden
                  />
                </Button>
              </div>
            </Container>

            <div className="top-container-format">
              <div>
                <Container maxWidth="sm">
                  <div className="center">
                    <Typography variant="p">
                      Location &nbsp; &nbsp;
                      <Autocomplete
                        className="MuiTextField-root"
                        name="Location"
                        apiKey={process.env.REACT_APP_MY_API_KEY}
                        style={{ width: "350px", height: "55px" }}
                        onPlaceSelected={(place) => {
                          setLocation(place["formatted_address"]);
                        }}
                        options={{
                          types: ["(regions)"],
                          componentRestrictions: { country: "ca" },
                        }}
                        defaultValue={location}
                      />
                    </Typography>
                  </div>
                </Container>

                <br />

                <Container maxWidth="sm">
                  <div className="center">
                    <span>
                      <Typography variant="p">
                        Bio &nbsp; &nbsp; &nbsp; &nbsp;
                      </Typography>{" "}
                      &nbsp;&nbsp;
                      <TextField
                        style={{ width: "350px", height: "55px" }}
                        multiline={true}
                        rows={3}
                        label="Bio"
                        name="Bio"
                        value={bio}
                        onChange={bioUpdater}
                        placeholder="e.g. I love long walks to the fridge"
                      ></TextField>
                    </span>
                    <br />
                    <br />
                    <Typography
                      className={bioLength >= 0 ? "safe" : "danger"}
                      variant="h6"
                    >
                      {bioLength}
                    </Typography>
                  </div>
                </Container>
              </div>

              <br />

              <Container maxWidth="sm">
                <div className="center">
                  <div>
                    <img
                      className="rectangle-img"
                      src={bannerPreview}
                      alt="banner pic"
                    />
                  </div>
                  <br />
                  <Button
                    variant="outlined"
                    component="label"
                    color="secondary"
                  >
                    Upload Banner
                    <input
                      type="file"
                      accept="image/*"
                      name="banner_picture"
                      onChange={bannerImageChange}
                      hidden
                    />
                  </Button>
                </div>
              </Container>
            </div>

            <br />

            <Container maxWidth="md" className="chip-spacing">
              <div className="center">
                <Typography variant="p">
                  Select all interests/hobbies that apply
                </Typography>

                <div className="formControl">
                  <FormControl onSubmit={(e) => {}}>
                    <ItemList picked={picked} setPicked={setPicked} />
                  </FormControl>
                </div>
              </div>
            </Container>

            <br />

            <div className="center">
              <Button variant="outlined" type="submit" color="secondary">
                Save
              </Button>
            </div>
          </Box>

          <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
            {/* Test for Alex logout */}
          </Box>
          <BottomNav value={props.value} setValue={props.setValue} />
        </div>
      )}
    </>
  );
}
export default Dashboard;
