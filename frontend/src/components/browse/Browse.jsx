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
  const [seen, setSeen] = useState([]);
  const navigator = useNavigate();

  const fetchSimUsers = async function () {
    if (props.user) {
      setLoading(true);
      const data = await axios.get(`/api/users/${props.user.id}/common`);

      for (let user of data.data) {
        if (seen.includes(user.id)) {
          console.log(`yup saw ${user.name}`);
        }
      }

      if (!data.data.length) {
        setEndOfList(true);
        navigator("/profile");
      }

      setSimilarUsers(data.data);
    }

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    axios
      .get(`api/users/${JSON.parse(localStorage.getItem("user")).id}`)
      .then((result) => {
        const user = result.data[0];
        props.setCurrentUser(user);
      });
    fetchSimUsers();
  }, [page]);

  useEffect(() => {
    axios.get(`/api/user_interests/${props.user.id}`).then((data) => {
      console.log(props.user);
      setProfileInterest([...data.data]);
    });
  }, []);

  const renderInterestList = profileInterests.map((interest) => {
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
            // border: "3px solid red"
          }}
        >
          {endOfList ? (
            <EndAnimation />
          ) : (
            <Container
              maxWidth="sm"
              sx={
                {
                  // border: "3px dashed blue"
                }
              }
            >
              <BrowseContent
                page={page}
                user={props.user}
                loading={loading}
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
