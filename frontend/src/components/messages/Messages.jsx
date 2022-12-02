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
import Input from "./components/Input"
import MessageBox from "./components/MessageBox"
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
  const {email, matchId}= state;
  const navigate = useNavigate();
  
  //Kevins state for test of message feature
  const currentUser = auth.currentUser;

  const[recieverName, setRecieverName] = useState(null);
  const[recieverUid, setRecieverUid] = useState(null);

  const[chatUid, setChatUid] = useState(null);

  const[senderName, setSenderName] = useState(currentUser.displayName);
  const[senderUid, setSenderUid] = useState(currentUser.uid);

  const[reciever, setReciever] = useState(null);

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
        checkChats(senderUid, doc.data().uid)
      });
    } catch (err) {
      console.log(err);
    }
  };

  //Check whether the chat between the 2 users exists and create if it doesnt and sed the combined ID
  const checkChats = async (senderUid, recieverUid) => {
    const combinedId =
      senderUid > recieverUid
      ? senderUid + recieverUid
      : recieverUid + senderUid;
      try {
        setChatUid(combinedId.toString());
        const res = await getDoc(doc(db, "chats", `${combinedId}`));

        if(!res.exists()) {
          //If it doesnt exist, create the chat in the overall chat db
          await setDoc(doc(db, "chats", combinedId), {messages: []});
        }
      } catch (err) {}
  }

  //Render the search feature once to get the user data
  useEffect(() => {
    Promise.all([
      axios.get(`/api/users/${Number(matchId)}`),
      handleSearch()
    ])
    .then((result) => {
      setReciever(result[0].data[0])
    })
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
      <Box
        sx={{
          pb: 10,
          // border: "3px solid red"
        }}
      >
        <CssBaseline />
        <TopNav />

        {/* THIS IS THE MAIN BODY - BETWEEN THE TOP NAV AND BOTTOM NAV */}
        
        <Container maxWidth="md"
          sx={{
            // border: "3px dashed blue"
          }}>
          <Box
            sx={{
              borderRadius: "1.75rem",
              backgroundColor: "#E4F8FF",
              // border: "3px solid red",
              padding: "2rem",
            }}
          >
            <Typography
              variant="h4"
              color="#008CCF"
              align="center"
              marginBottom="2rem"
            >
              Messages
            </Typography>

            <Typography variant='h5'>
              You are currently talking too {reciever !== null && reciever.name}
              <br/>
              Insert image here currently not displayed due to size, but nico and alex will do it.
            </Typography>

            <MessageBox
              chatUid = {chatUid}
              />
            <Input
              senderUid = {senderUid}
              recieverUid = {recieverUid} 
              senderName = {senderName}
              chatUid = {chatUid}
            />
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
