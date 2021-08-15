import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
//import { getStorage, setStorage } from "../utils/storage";

import "../scss/components/Confirm.scss";

class Confirm extends React.Component {
  render() {
    return (
      <>
        <Header title={"Forgotten password"} history={this.props.history} />
        <div className="Forgotten">
          <h2 className="fade-in step-0">Check your email</h2>
          <p className="fade-in step-1">
            If you have an account with us, you will receive a password reset
            link. Please follow the instructions to reset your password.
          </p>
          <br />
          <Link to="/landing">
            <button className="Cta Cta--secondary fade-in step-2">close</button>
          </Link>
        </div>
      </>
    );
  }
}

export default Confirm;
