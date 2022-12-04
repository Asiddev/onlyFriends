import React from "react";
import {
  Box, Typography,
} from "@mui/material";
import TimeAgo from 'timeago-react';
import "../Messages.scss";

const Message = (props) => {
  const message = props.message.message;
  const senderName = props.message.senderName;
  const postedDate = (props.message.date.seconds * 1000);

  const sender = props.sender;
  const reciever = props.reciever;

  const profileImage = senderName === sender.name ? sender.profile_picture : reciever.profile_picture;

  return (
    <Box
      className={senderName === sender.name ? "SenderMsg" : "RecieverMsg"}
      sx={{
        // border: "3px dashed purple",
        marginBottom: "1rem",
        // backgroundColor: "white",
        borderRadius: "1rem",
        padding: "0.7rem",
        width: "50%",
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        fontWeight: "bold",
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
        {/* <Typography
          variant="p">
          {senderName}
        </Typography> */}
        <Typography
          variant="p">
          {message}
        </Typography>
        <Box
          sx={{
            fontWeight: "bold",
            fontSize: "0.8rem"
          }}
        >
          <Typography
            variant="p"
          >
            <TimeAgo
              datetime={postedDate}
              locale='En'
            />
          </Typography>
        </Box>

      </Box>

    </Box>
  );
};

export default Message;
