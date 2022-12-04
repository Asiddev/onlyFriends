import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { db } from "../../../configAPI/firebase";
import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";

import { Box, TextField, Button } from "@mui/material";

const Input = (props) => {
  //Set states required to post message to firebase
  const [message, setMessage] = useState("");
  const chatUid = props.chatUid;
  const senderUid = props.senderUid;
  const senderName = props.senderName;

  const sendMessage = async () => {
    //Add message into overall chat database
    await updateDoc(doc(db, "chats", chatUid.toString()), {
      messages: arrayUnion({
        id: uuid(),
        message: message,
        senderId: senderUid,
        senderName: senderName,
        date: Timestamp.now(),
      }),
    });
    setMessage("");
  };

  return (
    <>
      <Box>
        <TextField
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "1rem",
            marginBottom: "1rem",
          }}
          multiline={true}
          minRows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
        ></TextField>

        <Button onClick={sendMessage} variant="contained">
          Send
        </Button>
      </Box>
    </>
  );
};

export default Input;
