import React from "react";
import { MentionsInput, Mention } from "react-mentions";

// Styling
import layout from "components/ui/chatInput.module.scss";

const ChatInput = ({ value, onChange, mentions, onEnterPress }) => {
  return (
    <MentionsInput
      className="mentions"
      classNames={layout}
      value={value}
      onChange={onChange}
      allowSpaceInQuery
      placeholder="Type a new message"
      onKeyPress={onEnterPress}
    >
      <Mention
        markup="@[__display__](__id__)"
        trigger="@"
        data={mentions}
        className={layout.mentions__mention}
      />
    </MentionsInput>
  );
};

export default ChatInput;
