import React from "react";
import { observer, enableStaticRendering } from "mobx-react-lite";

// UI
import UserLayout from "components/layout/userLayout";

const UserListLayout = ({ users }) => {
  enableStaticRendering(typeof window === "undefined");

  return (
    <React.Fragment>
      <div className="container">
        <div>
          <h3>Contacts</h3>
        </div>
        <div>
          {users.map((user) => {
            const isAnonymous = !user.displayName;

            return (
              <UserLayout
                isAnonymous={isAnonymous}
                name={user.name}
                key={user.uid}
                image={user.photoURL}
                role={user.role}
              />
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default observer(UserListLayout);
