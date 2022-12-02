import * as React from "react";
import {useLocation} from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  IconButton,
  Typography,
  Link,
  Box,
  AppBar,
  Toolbar,
  Container,
  TextField,
  CssBaseline,
} from "@mui/material";
import SignalWifiStatusbar4BarIcon from "@mui/icons-material/SignalWifiStatusbar4Bar";
import "./Messages.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../topnav/TopNav";
import BottomNav from "../bottomnav/BottomNav";
import Copyright from "../Copyright";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "../../configAPI/firebase";

function Messages(props) {
  const [profileInterests, setProfileInterest] = useState([]);
  const {state} = useLocation();
  const {email}= state;
  const navigate = useNavigate();

  //Kevins state for test of message feature
  const[recieverName, setRecieverName] = useState(null);
  const[recieverUid, setRecieverUid] = useState(null);

  const[senderName, setSenderName] = useState(null);
  const[senderUid, setSenderUid] = useState(null);

  const currentUser = auth.currentUser;
  //Kevins function for test of message feature
  
  //Search in database for the person we want to talk to.
  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("email", "==", email.toLowerCase())
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setRecieverName(doc.data().displayName)
        setRecieverUid(doc.data().uid)
      });
    } catch (err) {
      console.log(err);
    }
  };

  //Render the search feature once to get the user data
  useEffect(() => {
    handleSearch()
    setSenderName(currentUser.displayName);
    setSenderUid(currentUser.uid);
  },[]);

  const logOut = (event) => {
    event.preventDefault();
    axios.get("/api/users/logout").then(() => {
      localStorage.removeItem("user");
      props.setCurrentUser(null);
      navigate("/login");
    });
  };

  return (
    <>
   

      {/* NEW CODE BELOW - replace entire return block above */}
      {/* everything on this page is in this main Box, think of it as a fragment */}
      <Box sx={{
        pb: 10,
        // border: "3px solid red"
      }}>
        <CssBaseline />
        <TopNav />

        {/* THIS IS THE MAIN BODY - BETWEEN THE TOP NAV AND BOTTOM NAV */}
        
        <Container maxWidth="md"
          sx={{
            // border: "3px dashed blue"
          }}>
            <p>Email goes here {email}</p>
            <p>Data from fb to get correct name displayed here: {recieverName}</p>
            <p>Data from fb to get correct uid displayed here: {recieverUid}</p>
            <p>Logged in user name displayed here {senderName}</p>
            <p>Logged in user uid displayed here {senderUid}</p>
          <Box
            sx={{
              borderRadius: "1.75rem",
              backgroundColor: "#E4F8FF",
              // border: "3px solid red",
              padding: "2rem"
            }}
          >
            <Typography
              variant='h4'
              color="#008CCF"
              align='center'
              marginBottom="2rem"
            >
              Messages
            </Typography>

            <Typography variant='h5'>
              stuff - this blue card should replace the white card above
            </Typography>
          </Box>
        </Container>

        <br />
        <Copyright />
        <BottomNav value={props.value} setValue={props.setValue} />
      </Box>
    </>
  );
}
export default Messages;
