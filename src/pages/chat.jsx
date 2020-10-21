import React, { useEffect, useState, useMemo } from "react";
import { auth } from "../services/firebase";
import { db } from "../services/firebase"

import ChatContentLayout from "../components/layout/chatContentLayout";
import ChatInputLayout from "../components/layout/chatInputLayout";

const Chat = () => {
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [writeError, setWriteError] = useState();
  const [readError, setReadError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const user = useMemo(() => auth().currentUser, []);
  const ref = React.useRef(null);

  useEffect(() => {
    setReadError();

    try {
      db.ref("chats").on("value", snapshot => {
        const values = Object
          .values(snapshot.exportVal())
          .sort((a, b) => a.timestamp - b.timestamp);

        setIsLoading(false);
        setChatHistory(values);
      });
    } catch (error) {
      setReadError(error.message);
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    ref.current.scrollBy(0, ref.current.scrollHeight);
  }, [chatHistory]);

  const handleChange = (event) => setChatMessage(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    setWriteError();
    const chatArea = ref.current;

    try {
      await db.ref("chats").push({
        content: chatMessage,
        timestamp: Date.now(),
        uid: user.uid,
      });

      setChatMessage("");
      chatArea.scrollBy(0, chatArea.scrollHeight);
    } catch (error) {
      setWriteError(error.message);
    }
  };

  const ChatContent = useMemo(() => (
    <ChatContentLayout
      parentRef={ref}
      isLoading={isLoading}
      chatHistory={chatHistory}
      user={user}
      readError={readError}
    />
  ), [chatHistory, isLoading, readError, user]);

  return (
    <React.Fragment>
      {ChatContent}
      <ChatInputLayout
        chatMessage={chatMessage}
        user={user}
        writeError={writeError}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </React.Fragment>
  );
};

export default Chat;
