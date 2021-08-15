import React from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import ProfileMenuLink from "./ProfileMenuLink";
import { setAxiosHeaders } from "../utils/storage";

import "../scss/components/Profile.scss";

class ProfileSupport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      supportText: "",
    };
  }
  componentDidMount() {
    setAxiosHeaders();
    axios
      .post(this.props.journey.api + "AppSettings/GetSupportText")
      .then((response) => {
        this.setState({
          supportText: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <>
        <Header
          title={"Support"}
          history={this.props.history}
          backTo="/profile"
        />
        <div className="Profile">
          <p className="Profile__label">Support options</p>
          <div className="Profile__box">
            <p>{this.state.supportText}</p>
          </div>
          <div className="Profile__spacer"></div>
          <span style={{ color: "red" }}><ProfileMenuLink label="Sign out" to="" /></span>
          <div className="Profile__spacer"></div>
        </div>
        <Footer />
      </>
    );
  }
}

export default ProfileSupport;
