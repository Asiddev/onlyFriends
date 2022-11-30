import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";
import { useEffect } from "react";
import "./ItemList.scss";
import "../../styles/animations.scss";
import {
  Button,
  Grid,
} from "@mui/material";

const ItemList = (props) => {
  const [interests, setInterests] = useState([]);

  const handleClick = (e) => {
    e.stopPropagation();
    //ways of making number
    //+value == makes a number
    //parseInt(value) == makes number
    //Number(value) == makes number

    const interestId = Number(e.target.value);
    if (props.picked.includes(interestId)) {
      e.target.classList.remove("blockAni");
      props.setPicked((prevPicked) => {
        return prevPicked.filter((name) => interestId !== name);
      });
    } else {
      e.target.classList.add("blockAni");
      props.setPicked((prev) => [...prev, interestId]);
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
        variant={
          props.picked.includes(Number(interest.id)) ? "contained" : "outlined"
        }
        className={props.picked.includes(Number(interest.id)) ? "blockAni" : ""}
        onClick={handleClick}
        sx={{ marginRight: 1 }}
        value={interest.id}
      >
        {interest.name}
      </Button>
    );
  });

  return (
    <Grid container>
      <Grid item>{interestList}</Grid>
    </Grid>
  );
};

export default ItemList;
