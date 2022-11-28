import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";
import { useEffect } from "react";
import "./ItemList.scss";
import "../../styles/animations.scss";
import {
  Button,
  Typography,
  Grid,
  Container,
  Card,
  CardContent,
} from "@mui/material";

const ItemList = (props) => {
  const [interests, setInterests] = useState([]);

  const handleClick = (e) => {
    e.stopPropagation();
    if (props.picked.includes(e.target.value)) {
      e.target.classList.remove("blockAni");
      props.setPicked((prevPicked) => {
        return prevPicked.filter((name) => e.target.value !== name);
      });

      // const withoutArray = myArray.splice(index, 1);
    } else {
      e.target.classList.add("blockAni");
      props.setPicked((prev) => [...prev, e.target.value]);
    }
  };

  useEffect(() => {
    fetchInterests();
  }, []);

  function fetchInterests() {
    axios.get("/api/interests").then((data) => {
      setInterests(data.data);
    });
  }

  const interestList = interests.map((interest) => {
    return (
      <Button
        key={interest.id}
        variant="contained"
        onClick={handleClick}
        sx={{ marginRight: 1 }}
        value={interest.id}
      >
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
      <Grid item>{interestList}</Grid>
    </Grid>
  );
};

export default ItemList;