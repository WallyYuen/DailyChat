import React from "react";
import { observer, enableStaticRendering } from "mobx-react-lite";

// Component
import Modal from "components/container/modal";

// UI
import UserRowLayout from "components/layout/userRowLayout";

const UserListLayout = ({ users, modal: ModalContent, isInstructor }) => {
  enableStaticRendering(typeof window === "undefined");

  return users.map((user) => {
    const content = <ModalContent user={user} />;

    return (
      <div key={user.uid}>
        <Modal content={content} disabled={!isInstructor}>
          <UserRowLayout
            isAnonymous={!user.displayName}
            name={user.name}
            image={user.photoURL}
            role={user.role}
          />
        </Modal>
      </div>
    );
  });
};

export default observer(UserListLayout);
