import React from "react";
import Link from "next/link";
import { observer, enableStaticRendering } from "mobx-react-lite";
import { db } from "lib/firebase";
import { roles, addRoleAndOptions, addActors } from "lib/role";
import { PublicRoute } from "lib/routing";

// Components
import Button from "components/ui/button";

// Store
import { useApplicationStore } from "stores/applicationStore";

const Home = () => {
  enableStaticRendering(typeof window === "undefined");

  const { currentUser, isAuthenticated } = useApplicationStore();
  const isStudent = currentUser?.role === roles.student;

  const adminMail = process.env.NEXT_PUBLIC_ADMIN_ACCOUNT;

  const addAdmin = () => {
    addRoleAndOptions(roles.admin, adminMail);
  };

  const addInstructors = () => {
    addRoleAndOptions(roles.instructor, process.env.NEXT_PUBLIC_INSTRUCTORS_ACCOUNT);
  };

  const isAdmin = adminMail
    .split(",")
    .map(mail => mail.trim())
    .includes(currentUser?.email);

  // Not recommended to remove whole collections from a web client
  // TODO: use a function to remove collections, but plan needs to be upgraded
  const resetChat = () => {
    const collections = ["notifications", "settings", "chats"];

    collections.forEach((collection) => {
      db.collection(collection)
        .get()
        .then((snapshot) => snapshot.docs.forEach(doc => doc.ref.delete()))
        .catch((error) => {
          throw new Error(`Failed to remove collection: ${collection}, ${error}`);
        });
    });
  };

  return (
    <PublicRoute>
      <div>
        <section>
          <div className="">
            <div className="">
              <h1 className="">Welcome to Sub Chat</h1>
              <p className="">A great place to share your thoughts with friends</p>
              <div className="">
                {!isAuthenticated ? (
                  <React.Fragment>
                    <Link href="/login">
                      <Button label="Login to Your Account" />
                    </Link>
                  </React.Fragment>
                ) : (
                    <Link href={isStudent ? "/lobby" : "/dashboard"}>
                      <Button label={`Go to ${isStudent ? "lobby" : "chat"}`} classes={["btn-primary"]} />
                    </Link>
                  )}
              </div>
            </div>
          </div>
        </section>
        {(currentUser === roles.admin || isAdmin) && (
          <React.Fragment>
            <Button label="Add admins" onClick={addAdmin} />
            <Button label="Add instructors" onClick={addInstructors} />
            <Button label="Add actors" onClick={addActors} />
            <Button label="Reset chat" onClick={resetChat} />
          </React.Fragment>
        )}
      </div>
    </PublicRoute>
  );
};

export default observer(Home);
