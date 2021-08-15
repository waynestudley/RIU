import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import { getStorage } from "../utils/storage";

import "../scss/components/Success.scss";

class Success extends React.Component {
  render() {
    return (
      <>
        <Header
          title="Register"
          history={this.props.history}
          showBack={false}
        />
        <div className="Success">
          <h2 className="fade-in step-0">Nearly done</h2>
          <p className="fade-in step-1">
            We’ve sent a confirmation link to your email:
          </p>
          <p className="fade-in step-2">
            <strong>{getStorage("Register.email")}</strong>
          </p>
          <p className="fade-in step-3">
            Please click the link to complete your registration and take full
            advantage of all app features.
          </p>
          <Link to="/signin">
            <button className="Cta Cta--secondary fade-in step-4">
              Continue
            </button>
          </Link>
        </div>
      </>
    );
  }
}

export default Success;
