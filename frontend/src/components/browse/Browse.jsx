import * as React from "react";
import { Typography, CssBaseline, Box, Container, Button } from "@mui/material";
import "./Browse.scss";

import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

import BottomNav from "../bottomnav/BottomNav";

import EndAnimation from "./EndAnimation";
import BrowseContent from "./BrowseContent";
import BlizzardAnimation from "./BlizzardAnimation";
import TopNav from "../topnav/TopNav";
import Copyright from "../Copyright";
import { useNavigate } from "react-router-dom";

function Browse(props) {
  const [profileInterests, setProfileInterest] = useState([]);
  const [similarUsers, setSimilarUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [endOfList, setEndOfList] = useState(false);
  const navigator = useNavigate();

  const [userInterestList, setUserInterestList] = useState([]);
  let renderInterestList = ''


  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    },1000)
    if (similarUsers[page] && userInterestList[page]) {
      setProfileInterest(userInterestList[page])
    }
    if(similarUsers.length === 0) {
      setLoading(false);
      setEndOfList(true);
    }
  },[page])
  
  useEffect(() => {
    setLoading(true);

    axios.get(`/api/user_interests/${props.user.id}`).then((data) => {
      if (!data.data.length) {
        navigator("/profile");
      }
      // setProfileInterest([...data.data]);
    });

    axios.get(`/api/users/${props.user.id}/common`)
    .then((result) => {
      const users = result.data
      setSimilarUsers(users);
      if (!result.data) {
        setLoading(false);
        setEndOfList(true);
      }
      //Render each users interest list
      for (let i = 0; i < users.length; i++) {
        axios.get(`/api/user_interests/${users[i].id}`)
        .then((result) => {
          setUserInterestList((prev)=> [...prev, result.data]);
          if (i === page) {
            setProfileInterest(result.data)
          }
        })
      }
    })
  }, []);


  renderInterestList = profileInterests.map((interest) => {
    return (
      <Button
        className="btn"
        key={interest.id}
        variant="contained"
        sx={{ margin: 0.3 }}
      >
        <Typography fontSize="0.7rem">{interest.name}</Typography>
      </Button>
    );
  });

  return (
    <>
      <CssBaseline />
      <TopNav />
      {loading ? (
        <>
          <BlizzardAnimation
            value={props.value}
            setValue={props.setValue}
            setCurrentUser={props.setCurrentUser}
          />
        </>
      ) : (
        <Box
          sx={{
            pb: 10,
          }}
        >
          {endOfList ? (
            <EndAnimation />
          ) : (
            <Container maxWidth="sm">
              <BrowseContent
                page={page}
                user={props.user}
                loading={loading}
                setLoading ={setLoading}
                similarUsers={similarUsers}
                setEndOfList={setEndOfList}
                setPage={setPage}
                profileInterests={profileInterests}
                renderInterestList={renderInterestList}
              />
            </Container>
          )}

          <br />
          <Copyright />
          <BottomNav
            value={props.value}
            setValue={props.setValue}
            setCurrentUser={props.setCurrentUser}
          />
        </Box>
      )}
    </>
  );
}
export default Browse;
