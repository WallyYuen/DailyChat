import React from "react";

// UI
import UserCell from "components/ui/userCell";

const UserListLayout = ({ users }) => {
  return (
    <React.Fragment>
      <div className="container">
        <div>
          <h3>Contacts</h3>
        </div>
        <div>
          {users.map((user) => (
            <UserCell user={user} key={user.uid} />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserListLayout;
