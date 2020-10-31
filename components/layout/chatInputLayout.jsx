import React from "react";
import clsx from "clsx";
import { MentionsInput, Mention } from "react-mentions";

// UI
import Button from "components/ui/button";

// Styling
import layout from "assets/styles/layout/chatInputLayout.module.scss";
import button from "assets/styles/ui/button.module.scss";

const ChatInputLayout = ({
  inputValue,
  writeError,
  user,
  handleSubmit,
  handleChange,
  mentions,
}) => {
  const isEmpty = inputValue ? false : true;

  const handlePressEnter = (event) => {
    if (event.key !== "Enter") return;
    
    event.preventDefault();
    handleSubmit();
  };

  return (
    <div className={layout.container}>
      <form className={layout.form} onSubmit={handleSubmit}>
        <MentionsInput
          className="comments-textarea"
          value={inputValue}
          onChange={handleChange}
          allowSpaceInQuery
          placeholder="Type a new message"
          onKeyPress={handlePressEnter}
        >
          <Mention
            markup="@[__display__](__id__)"
            trigger="@"
            data={mentions}
          />
        </MentionsInput>
        {writeError && <p>{writeError}</p>}
        <Button
          className={clsx(layout.sendButton, {
            [button.disabled]: isEmpty,
            [button.neutral]: !isEmpty,
          })}
          disabled={isEmpty}
          label="Send"
          type="submit"
        />
      </form>
      <div>
        Logged in as: <strong>{user.email}</strong>
      </div>
    </div>
  );
};

export default ChatInputLayout;
