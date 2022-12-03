import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../configAPI/firebase";
import Message from "./Message";
import {
  Box,
} from "@mui/material";

const MessageBox = (props) => {
  const chatUid = props.chatUid;
  const senderName = props.senderName;
  const sender = props.sender
  const reciever = props.reciever
  const [messages, setMessages] = useState([]);



  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", `${chatUid}`), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [chatUid]);

  return (
    <div className="messages">
      {messages.map((message) => (

        <Box
          className = {message.senderName === sender.name? "Sender":"Reciever"}
        >
          <Message message={message} key={message.id} senderName={senderName} sender={sender} reciever = {reciever} />
        </Box>
      ))}
    </div>
  );
};

export default MessageBox;
