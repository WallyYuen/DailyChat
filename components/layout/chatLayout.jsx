import React from "react";

// Styling
import layout from "components/layout/chatLayout.module.scss";

const ChatLayout = ({ content, input }) => {
  return (
    <div className={layout.container}>
      {content}
      {input}
    </div>
  );
};

export default ChatLayout;
