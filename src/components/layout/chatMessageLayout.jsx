import React from "react";

// UI
import Button from "../../components/ui/button";

const ChatMessageLayout = ({
  chatMessage,
  user,
  writeError,
  handleSubmit,
  handleChange,
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit} className="mx-3">
        <textarea className="form-control" name="content" onChange={handleChange} value={chatMessage} />
          {writeError && <p className="text-danger">{writeError}</p>}
        <Button label="Send" type="submit" classes={["btn-submit mt-4"]} />
      </form>
      <div className="py-5 mx-3">
        Logged in as: <strong className="text-info">{user.email}</strong>
      </div>
    </div>
  );
};

export default ChatMessageLayout;
