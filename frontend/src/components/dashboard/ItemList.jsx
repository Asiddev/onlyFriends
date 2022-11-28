import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";

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
  const [selected, setSelected] = useState([]);

  return (
    <div>
      <h1>Select Interests / Hobbies</h1>
      <pre>{JSON.stringify(selected)}</pre>
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
      <button
        onSubmit={(e) => {
          console.log(e.target.textContent);
        }}
      >
        Save
      </button>
    </div>
  );
};

export default ItemList;
