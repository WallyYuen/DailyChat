import React, { useEffect, useState, useMemo, useContext, } from "react";
import { observer, enableStaticRendering } from "mobx-react-lite";
import { db } from "lib/firebase";

// Store
import { ApplicationContext } from "stores/applicationStore";

// Layout
import ChatContentLayout from "components/layout/chatContentLayout";
import ChatInputLayout from "components/layout/chatInputLayout";

// Styling
import layout from "assets/styles/layout/chatLayout.module.scss";

const Chat = () => {
  const [inputValue, setInputValue] = useState();
  const [writeError, setWriteError] = useState();
  const [mentions, setMentions] = useState([]);
  const [plainText, setPlainText] = useState();
  const [readError, setReadError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const store = useContext(ApplicationContext);
  const { messages, sortedMessages, activeUser, focusedUser } = store;

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
  }, [messages.length, store.userAsActor, ref?.current?.scrollHeight]);

  const handleChange = (event, newValue, newPlainTextValue, mentions) => {
    setInputValue(newValue);
    setMentions(mentions);
    setPlainText(newPlainTextValue);
  };

  const handleSubmit = async (event) => {
    event?.preventDefault();
    if (!plainText) return;

    setWriteError();

    const message = {
      content: plainText,
      timestamp: Date.now(),
      uid: activeUser.uid,
    };

    if (focusedUser) message.focusedUserId = focusedUser.uid;

    if (mentions.length > 0) {
      message.mentions = mentions.map(mention => mention.id);
    }

    db.collection("chats")
      .add(message)
      .then(() => {
        setInputValue();
        setMentions();
        setPlainText();
      })
      .catch(error => {
        setWriteError(error.message);
      });
  };

  const onEnterPress = (event) => {
    if (event.key !== "Enter") return;
    
    event.preventDefault();
    handleSubmit();
  };

  const ChatContent = useMemo(() => (
    <ChatContentLayout
      parentRef={ref}
      isLoading={isLoading}
      readError={readError}
      chatHistory={sortedMessages}
      user={activeUser}
    />
  ), [sortedMessages, isLoading, readError, activeUser]);

  return (
    <div className={layout.container}>
      {ChatContent}
      <ChatInputLayout
        inputValue={inputValue}
        user={activeUser}
        writeError={writeError}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        mentions={store.mentions}
        onEnterPress={onEnterPress}
      />
    </div>
  );
};

export default observer(Chat);
