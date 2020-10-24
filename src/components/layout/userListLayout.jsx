import React from "react";
import { observer } from "mobx-react";

const UserListLayout = ({ users }) => {
  return (
    <React.Fragment>
      <div className="container">
        <h5>
          Contacts
        </h5>
        <div className="dropdown-divider" />
        {users.map((user) => (
          <div key={user.uid}>
            {user.name}
          </div>
        )
        )}
      </div>
    </React.Fragment>
  );
};

export default observer(UserListLayout);
