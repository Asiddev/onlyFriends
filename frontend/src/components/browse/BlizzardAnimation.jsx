import React from "react";
import BottomNav from "../bottomnav/BottomNav";

function BlizzardAnimation(props) {
  return (
    <>
      <div className="loader">
        <div className="inner one"></div>
        <div className="inner two"></div>
        <div className="inner three"></div>
      </div>
      <BottomNav
        value={props.value}
        setValue={props.setValue}
        setCurrentUser={props.setCurrentUser}
      />
    </>
  );
}

export default BlizzardAnimation;
