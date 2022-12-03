import React, { useContext, useEffect, useRef } from "react";
import {
  Box, Typography,
} from "@mui/material";

const Message = (props) => {
  const message = props.message.message;
  const senderName = props.message.senderName;
  const postedDate = new Date(props.message.date.seconds * 1000).toISOString();
  const senderImage = props.senderImage;

  const sender = props.sender;
  const reciever = props.reciever;

  const profileImage = senderName === sender.name? sender.profile_picture: reciever.profile_picture;

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
          src={profileImage}
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
        <Typography
          variant="p">
          Posted On:{postedDate}
        </Typography>
      </Box>

    </Box>
  );
};

export default Message;
