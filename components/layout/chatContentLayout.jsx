import React from "react";
import clsx from "clsx";

const formatTime = (timestamp) => {
  const d = new Date(timestamp);

  return `${d.getDate()}/${(d.getMonth() + 1)}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
};

const ChatContentLayout = ({
  parentRef,
  isLoading,
  readError,
  user,
  chatHistory,
}) => {
  return (
    <div>
      <div className="chat-area" ref={parentRef}>
        {isLoading && (
          <div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
        {readError && <p className="text-danger">{readError}</p>}
        {!isLoading && !readError && chatHistory.map(message => (
          <p key={message.timestamp} className={clsx("chat-bubble", { "current-user": user.uid === message.uid })}>
            {message.content}
            <br />
            <span className="chat-time float-right">{formatTime(message.timestamp)}</span>
            <br />
            <span>{message.name}</span>
          </p>
        ))}
      </div>
    </div>
  );
};

export default ChatContentLayout;
