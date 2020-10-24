import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/container/header";
import Footer from "../components/container/footer";
import Button from "../components/ui/button";

const HomePage = ({ isAuthenticated }) => {
  return (
    <div className="home">
      <Header />
      <section>
        <div className="jumbotron jumbotron-fluid py-5">
          <div className="container text-center py-5">
            <h1 className="display-4">Welcome to Daily Chat</h1>
            <p className="lead">A great place to share your thoughts with friends</p>
            <div className="mt-4">
            {!isAuthenticated ? (
              <React.Fragment>
                <Link to="/signup">
                  <Button label="Create New Account" classes={["btn-primary"]} />
                </Link>
                <Link to="/login">
                  <Button label="Login to Your Account" />
                </Link>
              </React.Fragment>
            ) : (
              <Link to="/dashboard">
                <Button label="Go to chat" classes={["btn-primary"]} />
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

export default HomePage;
