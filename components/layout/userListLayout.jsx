import React from "react";
import { observer, enableStaticRendering } from "mobx-react-lite";
import Tippy from "@tippyjs/react";

// UI
import UserLayout from "components/layout/userLayout";
import Button from "components/ui/button";

// Styling
import "tippy.js/dist/tippy.css";
import lobbyLayout from "assets/styles/layout/lobbyListLayout.module.scss";
import button from "assets/styles/ui/button.module.scss";

const UserListLayout = ({ users, buttonLabel, onClick, header }) => {
  enableStaticRendering(typeof window === "undefined");

  return (
    <React.Fragment>
      <div className="container">
        <div>
          <h3>{header}</h3>
          {users.length}
        </div>
        <div>
          {users.map((user) => {
            const isAnonymous = !user.displayName;

            const Content = () => (
              <div>
                <Button
                  className={button.neutral}
                  label={buttonLabel}
                  onClick={onClick ? onClick(user) : () => {}}
                />
              </div>
            );

            return (
              <div key={user.uid}>
                <Tippy
                  content={<Content />}
                  className={lobbyLayout.tippy}
                  trigger="click"
                  touch
                  interactive
                  arrow={false}
                  placement="top-start"
                  disabled={!onClick}
                >
                  <UserLayout
                    isAnonymous={isAnonymous}
                    name={user.name}
                    image={user.photoURL}
                    role={user.role}
                  />
                </Tippy>
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default observer(UserListLayout);
