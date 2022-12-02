import React, { useContext, useState } from "react";
import {v4 as uuid} from "uuid";
import {db, storage} from "../../../configAPI/firebase";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
const Input = (props) => {

  //Set states required to post message to firebase
  const [message, setMessage] = useState("");
  const chatUid = props.chatUid
  const senderUid = props.senderUid
  const senderName = props.senderName
  const recieverUid = props.recieverUid
  
  const sendMessage = async () => {
    //Add message into overall chat database
    await updateDoc(doc(db, "chats", chatUid.toString()), {
      messages: arrayUnion({
        id: uuid(),
        message: message,
        senderId: senderUid,
        senderName: senderName,
        date: Timestamp.now()
      }),
    })
    setMessage("");
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange = {(e) => setMessage(e.target.value)}
        value= {message}
      />
      <div className="send">
        <button onClick = {sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Input;
