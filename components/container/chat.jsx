import React, { useEffect, useState, useMemo, useContext, } from "react";
import { observer, enableStaticRendering } from "mobx-react-lite";
import { db } from "lib/firebase";

// Store
import { ApplicationContext } from "stores/applicationStore";

// Layout
import ChatContentLayout from "components/layout/chatContentLayout";
import ChatInputLayout from "components/layout/chatInputLayout";

const Chat = () => {
  const [chatMessage, setChatMessage] = useState("");
  const [writeError, setWriteError] = useState();
  const [readError, setReadError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const store = useContext(ApplicationContext)
  const { messages, activeUser } = store;
  const ref = React.useRef(null);

  enableStaticRendering(typeof window === "undefined");

  useEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot((snapshot) => {
      const values = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => a.timestamp - b.timestamp);

      setIsLoading(false);
      store.setMessages(values);
    }, (error) => {
      setIsLoading(false);
      setReadError(error);
    });

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    ref.current.scrollBy(0, ref.current.scrollHeight);
  }, [messages.length]);

  const handleChange = (event) => setChatMessage(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    setWriteError();

    db.collection("chats").add({
      content: chatMessage,
      timestamp: Date.now(),
      uid: activeUser.uid,
    })
    .then(() => {
      setChatMessage("");
    })
    .catch(error => {
      setWriteError(error.message);
    });
  };

  const ChatContent = useMemo(() => (
    <ChatContentLayout
      parentRef={ref}
      isLoading={isLoading}
      readError={readError}
      chatHistory={messages}
      user={activeUser}
    />
  ), [messages, isLoading, readError, activeUser]);

  return (
    <React.Fragment>
      {ChatContent}
      <ChatInputLayout
        chatMessage={chatMessage}
        user={activeUser}
        writeError={writeError}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </React.Fragment>
  );
};

export default observer(Chat);
