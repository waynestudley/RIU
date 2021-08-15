import React from "react";
import Header from "./Header";
import Footer from "./Footer";

import axios from "axios";
import { setAxiosHeaders } from "../utils/storage";

import "../images/on.png";
import "../images/off.png";

import "../scss/components/ProfileContactPreferences.scss";

class ProfileContactPreferences extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contactPreferences: "",
      notifications: false,
      text: false,
      phone: false,
      email: false,
      Telephone: "",
    };
  }
  componentDidMount() {
    setAxiosHeaders();
    axios
      .post(
        this.props.journey.api + "AppSettings/GetCustomerMarketingPreferences"
      )
      .then((response) => {
        // setStorage("Contact.notifications", response.data.EnableNotifications);
        this.setState({
          notifications: response.data.EnableNotifications,
          text: response.data.TextOptIn,
          email: response.data.EmailOptIn,
          phone: response.data.PhoneOptIn,
          telephone: response.data.Telephone,
          regexp: /^(\+44\s?\d{10}|0044\s?\d{10}|0\s?\d{10})?$/i,
          updated: false,
          telephoneError: false
        });

        

      })
      .catch((error) => {
        console.log(error);
      });
  }

  toggleClick = (e) => {
    if (e.target.id === "contactPhone") {
      this.setState({
        phone: e.target.checked,
      });
    } else if (e.target.id === "contactText") {
      this.setState({
        text: e.target.checked,
      });
    } else if (e.target.id === "contactEmail") {
      this.setState({
        email: e.target.checked,
      });
    } else if (e.target.id === "notifications") {
      this.setState({
        notifications: e.target.checked,
      });
    }
  };

  submitClick = (e) => {
    e.preventDefault();
    setAxiosHeaders();
    axios
      .post(
        this.props.journey.api +
          "AppSettings/UpdateCustomerMarketingPreferences",
        {
          Telephone: this.state.telephone,
          EmailOptIn: this.state.email,
          PhoneOptIn: this.state.phone,
          TextOptIn: this.state.text,
          EnableNotifications: this.state.notifications,
          MarketingEmail: this.state.marketingEmail
        }
      )
      .then((response) => {
        // setStorage("Contact.email", response.data.EnableNotifications);
        this.setState({
          updated: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  phoneChange = (e) => {
    if (this.state.regexp.test(e.target.value)) {
      this.setState({
        telephone: e.target.value,
        telephoneError: false
      });
    } else {
      this.setState({
        telephone: e.target.value,
        telephoneError: true
      });
    }
  };

  render() {
    let isSubmitting = false;
    return (
      <>
        <Header
          title={"Contact preferences"}
          history={this.props.history}
          backTo="/profile"
        />
        <div className="ProfileContactPreferences fade-in step-0">
          <p>
            Stay up to date with Money Expert money-saving products and services
            that are relevant to you.
          </p>

          <div className="Profile__box">
            {this.state.updated && (
              <div style={{ color: "red", textAlign: "center" }}>
                Preferences updated
              </div>
            )}
            <label>Mobile Phone</label>
            {this.state.telephoneError && (
              <span style={{ color: "red" }}>
                - Invalid number
              </span>
            )}
            <input
              className=""
              type="text"
              name="mobilePhone"
              value={this.state.telephone}
              onChange={this.phoneChange}
            />
            <br />
            <br />
          </div>
          <p>Contact preferences</p>

          <div className="Profile__box--padded">
            <div className="ProfileContactPreferences__checkboxLabel">
              Contact by phone
            </div>
            <input
              className="ProfileContactPreferences__checkboxInput"
              type="checkbox"
              id="contactPhone"
              name="contactPhone"
              checked={this.state.phone}
              onChange={this.toggleClick}
            />
            <label htmlFor="contactPhone"></label>
          </div>

          <div className="Profile__box--padded">
            <div className="ProfileContactPreferences__checkboxLabel">
              Contact by text
            </div>
            <input
              className="ProfileContactPreferences__checkboxInput"
              type="checkbox"
              id="contactText"
              name="contactText"
              checked={this.state.text}
              onChange={this.toggleClick}
            />
            <label htmlFor="contactText"></label>
          </div>

          <div className="Profile__box--padded">
            <div className="ProfileContactPreferences__checkboxLabel">
              Contact by email
            </div>
            <input
              className="ProfileContactPreferences__checkboxInput"
              type="checkbox"
              id="contactEmail"
              name="contactEmail"
              checked={this.state.email}
              onChange={this.toggleClick}
            />
            <label htmlFor="contactEmail"></label>
          </div>

          <p>Notification</p>
          <div className="Profile__box--padded">
            <div className="ProfileContactPreferences__checkboxLabel">
              Enable notification
            </div>
            <input
              className="ProfileContactPreferences__checkboxInput"
              type="checkbox"
              id="notifications"
              name="notifications"
              checked={this.state.notifications}
              onChange={this.toggleClick}
            />
            <label htmlFor="notifications"></label>
          </div>
        </div>
        <br />
        <form onSubmit={this.sumbitMe}>
          <button
            className="Cta Cta--secondary "
            type="submit"
            disabled={isSubmitting}
            onClick={this.submitClick}
          >
            Save changes
          </button>
        </form>

        <Footer />
      </>
    );
  }
}

export default ProfileContactPreferences;
