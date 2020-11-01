import React from "react";
import clsx from "clsx";
import { observer, enableStaticRendering } from "mobx-react-lite";

// Styles
import layout from "assets/styles/layout/chatContentLayout.module.scss";
import type from "assets/styles/type.module.scss";

const formatTime = (timestamp) => {
  const d = new Date(timestamp);

  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
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
        {!isLoading && !readError && chatHistory.map(({ uid, messages }) => {
          const isUser = user.uid === uid;
          const userBubble = isUser ? layout.chatBubbleUser : layout.chatBubbleOther;

          return messages.map((message, index) => (
            <div
              key={message.timestamp}
              className={clsx(layout.chatBubbleContainer, userBubble, { [layout.grouped]: index !== 0 })}
            >
              {!isUser && index === 0 && (
                <span className={layout.userName}>{message.createdBy}</span>
              )}
              <div className={layout.messageContainer}>
                <span className={`${layout.message} ${type.chatMessage}`}>{message.content}</span>
                <span className={layout.timeStamp}>{formatTime(message.timestamp)}</span>
              </div>
            </div>
          ));

        })}
      </div>
    </div>
  );
};

export default observer(ChatContentLayout);
