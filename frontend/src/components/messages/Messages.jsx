import * as React from "react";
import { useLocation } from "react-router-dom";
import {
  Typography,
  Box,
  Container,
  CssBaseline,
} from "@mui/material";
import "./Messages.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../topnav/TopNav";
import BottomNav from "../bottomnav/BottomNav";
import Copyright from "../Copyright";
import Input from "./components/Input";
import MessageBox from "./components/MessageBox";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "../../configAPI/firebase";

function Messages(props) {
  const { state } = useLocation();
  const { email, matchId } = state;
  const navigate = useNavigate();

  //Kevins state for test of message feature
  const currentUser = auth.currentUser;

  const [chatUid, setChatUid] = useState(null);

  const [senderName] = useState(currentUser.displayName);
  const [senderUid] = useState(currentUser.uid);

  const[sender, setSender] = useState(null);
  const [reciever, setReciever] = useState(null);
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
        checkChats(senderUid, doc.data().uid);
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

      if (!res.exists()) {
        //If it doesnt exist, create the chat in the overall chat db
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
      }
    } catch (err) { }
  };

  //Render the search feature once to get the user data
  useEffect(() => {
    Promise.all([
      axios.get(`/api/users/${Number(matchId)}`),
      axios.get(`api/users/${JSON.parse(localStorage.getItem("user")).id}`),
      handleSearch()
    ])
      .then((result) => {
        setReciever(result[0].data[0]);
        setSender(result[1].data[0]);
      });
  }, []);

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

            <Typography variant='h5' display="flex" justifyContent="center">
              {/* You are currently talking to {reciever !== null && reciever.name} */}
              {reciever !== null && reciever.name}
            </Typography>

            <Box
              sx={{
                // border: "3px solid red",
              }}
            >
              <MessageBox
                chatUid={chatUid}
                senderName = {senderName}
                sender = {sender}
                reciever={reciever}
              />
            </Box>
            <Box
            // sx={{ border: "3px dashed green" }}
            >
              <Input
                senderUid={senderUid}
                senderName={senderName}
                chatUid={chatUid}
              />
            </Box>
          </Box>
        </Container>

        <br />
        <Copyright />
        <BottomNav value={props.value} setValue={props.setValue} />
      </Box >
    </>
  );
}
export default Messages;
