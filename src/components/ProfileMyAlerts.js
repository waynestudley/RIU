import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import { setAxiosHeaders } from "../utils/storage";

import "../scss/components/ProfileAlerts.scss";

class ProfileMyAlerts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertText: null,
    };
  }
  componentDidMount() {
    console.log("ReactComp ComponentDidlMount Alerts");
    setAxiosHeaders();
    axios
      .post(this.props.journey.api + "AppSettings/GetAlertsForCustomer")
      .then((response) => {
        this.setState({
          alertText: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  componentWillUnmount() {
    console.log("ReactComp ComponentWillUnmount");
  }

  alertChanged = (e) => {
    setAxiosHeaders();
    axios
      .post(
        this.props.journey.api +
          `AppSettings/SetAlertForCustomer?customerAlertId=${e.target.name}&enabled=${e.target.checked}`
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <>
        <Header
          title={"My Renewal Alerts"}
          history={this.props.history}
          backTo="/profile"
        />

        <div className="Profile">
          <p>
            Activate your reminders and we will let you have competitive renewal
            quotes before your renewal is due.
          </p>
        </div>
        {!this.state.alertText && (
          <div className="Profile__box">
            <span style={{ color: "red" }}>No alerts</span>
          </div>
        )}
        {/* WILL NEED TO UPDATE THIS FOR VARIOUS TYPES OF ALERTS */}
        {this.state.alertText && (
          <div>
            {this.state.alertText.map((value, index) => {
              return (
                <div key={index} className="ProfileAlerts__box--padded">
                  <div className="YourQuotes__flexItemTitle">
                    {value.AlertTypeDescription}
                  </div>
                  <input
                    className="ProfileContactPreferences__checkboxInput"
                    type="checkbox"
                    id="contactEmail"
                    name={value.CustomerAlertId}
                    key={value.CustomerAlertId}
                    onChange={this.alertChanged}
                    defaultChecked={!value.Enabled}
                  />
                  <label htmlFor="contactEmail"></label>
                  <br />
                  <br />
                  <div className="YourQuotes__flexItemDivider"></div>
                  <div>{value.SupplierName}</div>
                  <div>{value.TariffName}</div>
                  <br />
                  <h6>Expires</h6>
                  <div>
                    {
                      new Intl.DateTimeFormat("en-GB")
                        .format(new Date(value.ApplicationExpiryDate))
                        .split("T")[0]
                    }
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <Footer />
      </>
    );
  }
}

export default ProfileMyAlerts;
