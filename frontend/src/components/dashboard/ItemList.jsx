import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";
import { useEffect } from "react";
import "./ItemList.scss";
import "../../styles/animations.scss";

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

const ItemList = () => {
  const [interests, setInterests] = useState([]);

  const handleClick = (e) => {
    e.stopPropagation();
    console.log(e.target.classList.toggle("blockAni"));
  };

  useEffect(() => {
    fetchInterests();
  }, []);

  function fetchInterests() {
    axios.get("/api/interests").then((data) => {
      setInterests(data.data);
    });
  }

  console.log(interests);

  const interestList = interests.map((interest) => {
    return (
      <button key={interest.id} className="interest-btn" onClick={handleClick}>
        {interest.name}
      </button>
    );
  });

  return <div className="center grid">{interestList}</div>;
};

export default ItemList;
