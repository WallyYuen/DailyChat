import React from "react";
import clsx from "clsx";
import { observer, enableStaticRendering } from "mobx-react-lite";

// layout
import layout from "assets/styles/layout/chatContentLayout.module.scss";

const formatTime = (timestamp) => {
  const d = new Date(timestamp);

  return `${d.getHours()}:${d.getMinutes()}`;
};

const ChatContentLayout = ({
  parentRef,
  isLoading,
  readError,
  user,
  chatHistory,
}) => {
  enableStaticRendering(typeof window === "undefined");

  return (
    <div className={layout.container}>
      <div className={layout.chatArea} ref={parentRef}>
        {isLoading && (
          <div role="status">
            <span>Loading...</span>
          </div>
        )}
        {readError && <p>{readError}</p>}
        {!isLoading && !readError && chatHistory.map(message => (
          <p key={message.timestamp} className={clsx({ [layout.chatBubbleUser]: user.uid === message.user?.uid, [layout.chatBubbleOther]: user.uid !== message.user?.uid })}>
            {message.content}
            <br />
            <span className={layout.chatTime}>{formatTime(message.timestamp)}</span>
            <br />
            <span>{message.createdBy}</span>
          </p>
        ))}
      </div>
    </div>
  );
};

export default observer(ChatContentLayout);
