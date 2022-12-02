import React, { useContext, useEffect, useRef } from "react";

const Message = (props ) => {
  const message = props.message.message;
  const senderName = props.message.senderName


  return (
    <div>
      <p> This message was sent by {senderName}:</p>
      <p>{message}</p>
    </div>
  );
};

export default Message;
