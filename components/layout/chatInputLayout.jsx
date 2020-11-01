import React from "react";
import clsx from "clsx";

// UI
import Button from "components/ui/button";
import MentionInput from "components/ui/mentionInput";

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
  onEnterPress,
}) => {
  const isEmpty = inputValue ? false : true;

  return (
    <div className={layout.container}>
      <form className={layout.form} onSubmit={handleSubmit}>
        <MentionInput
          mentions={mentions}
          onChange={handleChange}
          value={inputValue}
          onEnterPress={onEnterPress}
        />
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
    </div>
  );
};

export default ChatInputLayout;
