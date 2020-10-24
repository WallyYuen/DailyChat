import React, { useEffect, useState, useMemo } from "react";
import { auth, db } from "../lib/firebase";

import ChatContentLayout from "../components/layout/chatContentLayout";
import ChatInputLayout from "../components/layout/chatInputLayout";

const Chat = () => {
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [writeError, setWriteError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const user = useMemo(() => auth().currentUser, []);
  const ref = React.useRef(null);

  useEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot((snapshot) => {
      const values = snapshot.docs
        .map(doc => doc.data())
        .sort((a, b) => a.timestamp - b.timestamp);

      setIsLoading(false);
      setChatHistory(values);
    });

    return () => unsubscribe();
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

    db.collection("chats").add({
      content: chatMessage,
      timestamp: Date.now(),
      uid: user.uid,
    })
    .then(() => {
      setChatMessage("");
      chatArea.scrollBy(0, chatArea.scrollHeight);
    })
    .catch(error => {
      setWriteError(error.message);
    });
  };

  const ChatContent = useMemo(() => (
    <ChatContentLayout
      parentRef={ref}
      isLoading={isLoading}
      chatHistory={chatHistory}
      user={user}
    />
  ), [chatHistory, isLoading, user]);

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
