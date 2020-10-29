import React from "react";
import Link from "next/link";
import { observer, enableStaticRendering } from "mobx-react-lite";
import { roles } from "lib/role";

// Components
import Header from "components/container/header";
import Footer from "components/container/footer";
import Button from "components/ui/button";

// Store
import { useApplicationStore } from "stores/applicationStore";

const Home = () => {
  enableStaticRendering(typeof window === "undefined");

  const { currentUser, isAuthenticated } = useApplicationStore();
  const isStudent = currentUser?.role === roles.student;

  return (
    <div className="home">
      <Header />
      <section>
        <div className="">
          <div className="">
            <h1 className="">Welcome to Daily Chat</h1>
            <p className="">A great place to share your thoughts with friends</p>
            <div className="">
              {!isAuthenticated ? (
                <React.Fragment>
                  <Link href="/register">
                    <Button label="Create New Account" classes={["btn-primary"]} />
                  </Link>
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
      <Footer />
    </div>
  );
};

export default observer(Home);
