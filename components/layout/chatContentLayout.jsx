import React from "react";
import clsx from "clsx";
import { observer, enableStaticRendering } from "mobx-react-lite";

// Styles
import layout from "assets/styles/layout/chatContentLayout.module.scss";
import type from "assets/styles/type.module.scss";

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
        {!isLoading && !readError && chatHistory.map(message => {
          const isUser = user.uid === message.user?.uid;
          const userBubble = isUser ? layout.chatBubbleUser : layout.chatBubbleOther;

          return (
            <div
              key={message.timestamp}
              className={clsx(layout.chatBubbleContainer, userBubble)}
            >
              {!isUser && (
                <span className={layout.userName}>{message.createdBy}</span>
              )}
              <div className={layout.messageContainer}>
                <span className={`${layout.message} ${type.chatMessage}`}>{message.content}</span>
                <span className={layout.timeStamp}>{formatTime(message.timestamp)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default observer(ChatContentLayout);
