import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import {db} from "../../../configAPI/firebase";
import Message from "./Message";

const MessageBox = (props) => {
  const chatUid = props.chatUid
  const senderName = props.senderName
  const recieverName = props.recieverName
  const [messages, setMessages] = useState([]);



  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", `${chatUid}`), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [chatUid])

  return (
    <div className="messages">
     {messages.map((message) => (
        <Message message={message} key={message.id} senderName = {senderName}/>
      ))}
    </div>
  );
};

export default MessageBox;
