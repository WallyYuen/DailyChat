import React from "react";
import { MentionsInput, Mention } from "react-mentions";

// Styling
import classNames from "assets/styles/ui/mention.module.scss";

const ChatInputLayout = ({ value, onChange, mentions, onEnterPress }) => {
  return (
    <MentionsInput
      className="mentions"
      classNames={classNames}
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
        className={classNames.mentions__mention}
      />
    </MentionsInput>
  );
};

export default ChatInputLayout;
