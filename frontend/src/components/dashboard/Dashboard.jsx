import React, { useState, useEffect } from "react";
import { storage } from "../../configAPI/firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import "./Dashboard.scss";
import "../../styles/animations.scss";
import BottomNav from "../bottomnav/BottomNav.jsx";
import TopNav from "../topnav/TopNav.jsx";
import Copyright from "../Copyright.jsx";
import DashboardContent from "./dashboardContent/DashboardContent.jsx";

function Dashboard(props) {
  //Refactor state like scheduler if time permits
  const [bio, setBio] = useState("");
  let bioLimit = 100;
  const [bioLength, setBioLength] = useState(bioLimit);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [bannerImage, setBannerImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [error, setError] = useState(null);
  const [fetchingLocation, setFetchingLocation] = useState(null);
  const [picked, setPicked] = useState([]);

  const navigate = useNavigate();

  function getLocation() {
    setFetchingLocation(true);
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      axios
        .get("https://api64.ipify.org?format=json")
        .then((data) => {
          const ip = data.data.ip;
          return ip;
        })
        .then((data) => {
          console.log(data);
          axios.get(`http://ip-api.com/json/${data}`).then((data) => {
            let { city, region, country } = data.data;
            let string = `${city}, ${region}, ${country}`;
            console.log(string);
            setLocation(string);
          });
        });
    });
  }

  useEffect(() => {
    Promise.all([
      axios.get(`api/users/${JSON.parse(localStorage.getItem("user")).id}`),
      axios.get(
        `api/user_interests/${JSON.parse(localStorage.getItem("user")).id}`
      ),
    ]).then((all) => {
      getLocation();
      const user = all[0].data[0]; // This returns an object
      const userInterests = all[1].data; // This returns an array

      props.setCurrentUser(user);
      !user.description ? setBio("") : setBio(user.description);
      !user.description
        ? setBioLength(bioLimit)
        : setBioLength(bioLimit - user.description.length);
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
    getLocation();

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
          <TopNav />
          <span className="center savingGif" color="primary">
            {/* Saving... */}
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
        <>
          {/* everything on this page is in this main Box, think of it as a fragment */}
          <Box
            sx={{
              pb: 10,
              // border: "3px solid red"
            }}
          >
            <CssBaseline />
            <TopNav />

            {/* THIS IS THE MAIN CONTAINER */}

            <DashboardContent
              postProfile={postProfile}
              error={error}
              fetchingLocation={fetchingLocation}
              bioUpdater={bioUpdater}
              bio={bio}
              bioLength={bioLength}
              setLocation={setLocation}
              location={location}
              picked={picked}
              setPicked={setPicked}
              profileImageChange={profileImageChange}
              profilePreview={profilePreview}
              bannerImage={bannerImage}
              bannerImageChange={bannerImageChange}
              bannerPreview={bannerPreview}
            />

            <br />
            <Copyright />
            <BottomNav value={props.value} setValue={props.setValue} />
          </Box>
        </>
      )}
    </>
  );
}
export default Dashboard;
