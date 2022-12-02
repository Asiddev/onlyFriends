import React, { useContext, useEffect, useRef } from "react";
import {
  Box, Typography,
} from "@mui/material";

const Message = (props) => {
  const message = props.message.message;
  const senderName = props.message.senderName;


  return (
    <Box
      sx={{
        // border: "3px dashed purple",
        marginBottom: "1rem",
        backgroundColor: "white",
        borderRadius: "1rem",
        padding: "0.7rem",
        width: "50%",
        display: "flex",
        gap: "1rem",
      }}
    >
      <Box>
        <Box
          className="circle-img"
          component="img"
          sx={{
            width: "50px",
            height: "50px",
            borderRadius: "100%",
            objectFit: "cover",
          }}
          alt="Profile pic"
          src="https://i.imgur.com/QMntCB7_d.webp?maxwidth=760&fidelity=grand"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Typography
          variant="p">
          {senderName}
        </Typography>
        <Typography
          variant="p">
          {message}
        </Typography>
      </Box>

    </Box>
  );
};

export default Message;
