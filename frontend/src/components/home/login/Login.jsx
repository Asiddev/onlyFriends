import * as React from "react";
import { Box } from "@mui/material";
import LeftLoginSection from "./LeftLoginSection";
import RightLoginSection from "./RightLoginSection";


function Login(props) {

  return (
    <Box className="container">
      <LeftLoginSection
        setCurrentUser={props.setCurrentUser}
        setCookie={props.setCookie}
      />
      <RightLoginSection />
    </Box>
  );
}

export default Login;
