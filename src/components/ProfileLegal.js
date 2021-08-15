import React from "react";
import Header from "./Header";
import Footer from "./Footer";

import "../scss/components/Profile.scss";

import { ReactComponent as ArrowRight } from "../images/arrow-right.svg";

class ProfileLegal extends React.Component {
  render() {
    return (
      <>
        <Header
          title={"Legal"}
          history={this.props.history}
          backTo="/profile"
        />
        <div className="Profile">
          <p className="Profile__label">
            You can view our Terms and Conditions and Privacy Policy from the
            links below
          </p>
          <div className="Profile__spacer"></div>

          <a href="https://www.moneyexpert.com/app/eula/" target="_blank" rel="noopener noreferrer">
            <div className="Profile__menuLink">
              <div>End User Licence Agreement (EULA)</div>
              <div>
                <ArrowRight />
              </div>
            </div>
          </a>

          <a href="https://www.moneyexpert.com/privacy-policy" target="_blank" rel="noopener noreferrer">
            <div className="Profile__menuLink">
              <div>Privacy Policy</div>
              <div>
                <ArrowRight />
              </div>
            </div>
          </a>

          <a href="https://www.moneyexpert.com/app/documentation/" target="_blank" rel="noopener noreferrer">
            <div className="Profile__menuLink">
              <div>More about the Money Expert Mobile App</div>
              <div>
                <ArrowRight />
              </div>
            </div>
          </a>

          <div className="Profile__spacer"></div>
        </div>
        <Footer />
      </>
    );
  }
}

export default ProfileLegal;
