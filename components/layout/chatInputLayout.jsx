import React from "react";
import { MentionsInput, Mention } from "react-mentions";

// UI
import Button from "components/ui/button";

const ChatInputLayout = ({
  mentionAdded,
  inputValue,
  writeError,
  user,
  handleSubmit,
  handleChange,
  mentions,
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit} className="mx-3 form-centered">
        <MentionsInput
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
        {writeError && <p className="text-danger">{writeError}</p>}
        <Button label="Send" type="submit" classes={["btn-submit mt-4"]} />
      </form>
      <div className="py-5 mx-3">
        Logged in as: <strong className="text-info">{user.email}</strong>
      </div>
    </div>
  );
};

export default ChatInputLayout;
