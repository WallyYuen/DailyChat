import React, { useEffect, useState, useMemo, useContext, } from "react";
import { observer, enableStaticRendering } from "mobx-react-lite";
import { auth, db } from "lib/firebase";

// Store
import { ApplicationContext } from "stores/applicationStore";

// Layout
import ChatContentLayout from "components/layout/chatContentLayout";
import ChatInputLayout from "components/layout/chatInputLayout";

const Chat = () => {
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [writeError, setWriteError] = useState();
  const [readError, setReadError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { users, activeUser } = useContext(ApplicationContext);

  const ref = React.useRef(null);
  const userUids = users.map(user => user.uid);

  enableStaticRendering(typeof window === "undefined");

  useEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot((snapshot) => {
      const values = snapshot.docs
        .map(doc => doc.data())
        .sort((a, b) => a.timestamp - b.timestamp)
        .map((value) => {
          const messageUser = users.find(user => user.uid === value.uid);
          const name = messageUser?.name ?? "Deleted";
          
          return { ...value, name };
        });

      setIsLoading(false);
      setChatHistory(values);
    }, (error) => {
      setIsLoading(false);
      setReadError(error);
    });

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userUids]);

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
      uid: activeUser.uid,
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
      readError={readError}
      chatHistory={chatHistory}
      user={activeUser}
    />
  ), [chatHistory, isLoading, readError, activeUser]);

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
