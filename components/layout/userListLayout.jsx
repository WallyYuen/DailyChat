import React from "react";

const UserListLayout = ({ users }) => {
  return (
    <React.Fragment>
      <div className="container">
        <h3>
          Contacts
        </h3>
        <div className="dropdown-divider" />
        {users.map((user) => (
          <div key={user.uid}>
            {user.name}
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default UserListLayout;
