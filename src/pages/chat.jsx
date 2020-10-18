/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo } from "react";
import Header from "../components/header";
import { auth } from "../services/firebase";
import { db } from "../services/firebase"

const formatTime = (timestamp) => {
  const d = new Date(timestamp);

  return `${d.getDate()}/${(d.getMonth() + 1)}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
};

const Chat = () => {
  const [content, setContent] = useState("");
  const [chatContent, setChatContent] = useState([]);
  const [writeError, setWriteError] = useState();
  const [readError, setReadError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const user = useMemo(() => auth().currentUser, []);
  const ref = useMemo(() => React.createRef(), []);

  useEffect(() => {
    setReadError();

    try {
      db.ref("chats").on("value", snapshot => {
        const chatView = ref.current;
        const values = Object
          .values(snapshot.exportVal())
          .sort((a, b) => a.timestamp - b.timestamp);

          chatView.scrollBy(0, chatView.scrollHeight);
          setIsLoading(false);
          setChatContent(values);
      });
    } catch (error) {
      setReadError(error.message);
      setIsLoading(false);
    }
  }, [ref]);

  const handleChange = (event) => setContent(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    setWriteError();
    const chatArea = ref.current;

    try {
      await db.ref("chats").push({
        content,
        timestamp: Date.now(),
        uid: user.uid,
      });

      setContent("");
      chatArea.scrollBy(0, chatArea.scrollHeight);
    } catch (error) {
      setWriteError(error.message);
    }
  };

  return (
    <div>
      <Header />
      
      <div className="chat-area" ref={ref}>
        {isLoading && (
          <div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
        {readError && <p className="text-danger">{readError}</p>}
        {!isLoading && !readError && chatContent.map(message => (
          <p key={message.timestamp} className={["chat-bubble", user.uid === message.uid ? "current-user" : ""].join(" ")}>
            {message.content}
            <br />
            <span className="chat-time float-right">{formatTime(message.timestamp)}</span>
          </p>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="mx-3">
        <textarea className="form-control" name="content" onChange={handleChange} value={content}></textarea>
          {writeError && <p className="text-danger">{writeError}</p>}
        <button type="submit" className="btn btn-submit px-5 mt-4">Send</button>
      </form>
      <div className="py-5 mx-3">
        Login in as: <strong className="text-info">{user.email}</strong>
      </div>
    </div>
  );
};

export default Chat;
