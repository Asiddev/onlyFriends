import React from "react";

function Dashboard(props) {
  let interestList = props.user.interests.map((interest, i) => {
    return <li key={props.user.interests[i]}>{interest}</li>;
  });

  return (
    <div>
      <p> dashboard page </p>
      <h1>WELCOME {props.user.name} </h1>
      <h3>Interests</h3>
      <ul>{interestList}</ul>
    </div>
  );
}

export default Dashboard;
