import React from "react";
import clsx from "clsx";

// UI
import Button from "components/ui/button";
import ChatInput from "components/ui/chatInput";

// Styling
import layout from "components/layout/chatInputLayout.module.scss";
import button from "components/ui/button.module.scss";

const ChatInputLayout = ({
  inputValue,
  writeError,
  handleSubmit,
  handleChange,
  mentions,
  onEnterPress,
}) => {
  const isEmpty = inputValue ? false : true;

  return (
    <div className={layout.container}>
      <form className={layout.form} onSubmit={handleSubmit}>
        <ChatInput
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
