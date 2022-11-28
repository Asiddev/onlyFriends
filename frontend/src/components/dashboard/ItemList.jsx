import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";
import { useEffect } from "react";
import "./ItemList.scss";
import "../../styles/animations.scss";
import { Button, Typography, Grid, Container, Card, CardContent } from '@mui/material';

const options = [
  { label: "Axe-Throwing 🪓", value: "Axe-Throwing", id: 1 },
  { label: "Climbing 🧗‍♀️", value: "Climbing", id: 2 },
  { label: "Fencing 🤺", value: "Fencing", id: 3 },
  { label: "Polevaulting 𐃆", value: "Polevaulting", id: 4 },
  { label: "Hiking 🥾", value: "Hiking", id: 5 },
  { label: "Sking ⛷", value: "Sking", id: 6 },
  { label: "Snowboarding 🏂", value: "Snowboarding", id: 7 },
  { label: "Reading Circle 📕", value: "Reading-Circle", id: 8 },
];

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const ItemList = () => {
  const [interests, setInterests] = useState([]);

  const handleClick = (e) => {
    e.stopPropagation();
    console.log("target", e.target.classList);
    e.target.classList.toggle("blockAni");
  };

  useEffect(() => {
    fetchInterests();
  }, []);

  function fetchInterests() {
    axios.get("/api/interests").then((data) => {
      setInterests(data.data);
    });
  }

  console.log("interests:", interests);

  const interestList = interests.map((interest) => {
    return (
      <Button key={interest.id} variant="contained" onClick={handleClick} sx={{ marginRight: 1}}>
        {interest.name}
      </Button>
    );
  });

  return (
    // <div>
    //   {interestList}
    // </div>


    // <Container>
    //   <Grid container spacing={4}>
    //     {interests.map((interest) => (
    //       <Button item key={interest.id} xs={12} sm={6} md={4} onClick={handleClick} variant="contained" spacing="20">
    //         <Typography>
    //           {interest.name}
    //         </Typography>
    //       </Button>
    //     ))}
    //   </Grid>
    // </Container>

    <Grid container>
      <Grid item >
        {interestList}
      </Grid>
    </Grid>
  );
};

export default ItemList;
