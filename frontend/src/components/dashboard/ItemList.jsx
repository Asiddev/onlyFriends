import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";
import { useEffect } from "react";
import "./ItemList.scss";
import "../../styles/animations.scss";

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
      <button
        key={interest.id}
        className="interest-btn"
        onClick={handleClick}
        value={interest.id}
      >
        {interest.name}
      </button>
    );
  });

  return <div className="center grid">{interestList}</div>;
};

export default ItemList;
