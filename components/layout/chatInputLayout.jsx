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
  const isEmpty = inputValue === undefined || inputValue === "";

  return (
    <div className={layout.container}>
      <form className={layout.form} onSubmit={handleSubmit}>
        <MentionsInput
          className={layout.inputField}
          value={inputValue}
          onChange={handleChange}
          allowSpaceInQuery
        >
          <Mention
            markup="@[__display__](__id__)"
            trigger="@"
            data={mentions}
          />
        </MentionsInput>
        {writeError && <p>{writeError}</p>}
        <Button className={clsx(layout.sendButton, { [button.disabled]: isEmpty, [button.neutral]: !isEmpty })} disabled={isEmpty} label="Send" type="submit" />
      </form>
      <div>
        Logged in as: <strong>{user.email}</strong>
      </div>
    </div>
  );
};

export default ChatInputLayout;
