import React from "react";
import { observer, enableStaticRendering } from "mobx-react-lite";
import Tippy from "@tippyjs/react";
import { followCursor, hideAll } from "tippy.js";

// UI
import UserLayout from "components/layout/userLayout";

// Styling
import "tippy.js/dist/tippy.css";
import layout from "components/layout/userListLayout.module.scss";

const UserListLayout = ({ users, modal: Modal, isInstructor }) => {
  enableStaticRendering(typeof window === "undefined");

  return users.map((user) => (
    <div key={user.uid}>
      <Tippy
        content={<Modal user={user} onCancel={() => { hideAll() }} />}
        className={layout.tippy}
        trigger="click"
        touch
        interactive
        arrow={false}
        placement="left-start"
        disabled={!isInstructor}
        plugins={[followCursor]}
        followCursor="initial"
      >
        <UserLayout
          isAnonymous={!user.displayName}
          name={user.name}
          image={user.photoURL}
          role={user.role}
        />
      </Tippy>
    </div>
  ));
};

export default observer(UserListLayout);
