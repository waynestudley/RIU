import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Formik } from "formik";
import Header from "./Header";
import Blocker from "./Blocker";
import { setAxiosHeaders, getStorage, setStorage } from "../utils/storage";

import "../scss/components/Signin.scss";

/**
 * https://testapi.moneyexpert.com/api/Auth/CreateTokenMexApp?userName=tomas.wagner@moneyexpert.com&password=xxx
 */

class Signin extends React.Component {
  constructor() {
    super();
    this.state = { showBlocker: false, invalidLogin: false };
  }

  tryLogin = (setSubmitting) => {
    //console.log(">>>", this.props)
    this.setState({ showBlocker: true });
    var params = {
      username: getStorage("Login.email"),
      password: getStorage("Login.password"),
    };
    axios
      .post(this.props.journey.api + "Auth/mex", params)
      .then((response) => {
        setStorage("Login.token", response.data.token);
        this.getAgentDetails(setSubmitting);
      })
      .catch((error, response) => {
        console.log(">", response.data.token);
        console.log(error);
        setSubmitting(false);
        this.setState({ showBlocker: false, invalidLogin: true });
      });
  };

  getAgentDetails = (setSubmitting) => {
    setAxiosHeaders();
    axios
      .post(this.props.journey.api + "UserLogin/GetUserDetails")
      .then((response) => {
        if (response.data === null || response.status === 401) {
          console.log(response);
        } else if (response.status !== 401) {
          /*
          setStorage("Login.SalesAgentId", response.data.SalesAgentId);
          setStorage("Login.CallcentreId", response.data.CallCentreId);
          setStorage("Login.Name", response.data.Name);
          setStorage("Login.Data", JSON.stringify(response.data));
          */

          setStorage("Profile.FirstName", response.data.FirstName);
          setStorage("Profile.Surname", response.data.Surname);
          setStorage("Profile.CustomerId", response.data.CustomerId);

          setStorage("Profile.Address1", response.data.Address1);
          setStorage(
            "Profile.Address2",
            response.data.Address2 !== "null" ? response.data.Address2 : ""
          );
          setStorage("Profile.Address3", response.data.County);
          setStorage("Profile.Town", response.data.Town);
          setStorage("Profile.Postcode", response.data.Postcode);

          this.goNextRoute();
        }
        if (this.props.journey.autoLogin !== true) {
          setSubmitting(false);
        }
      })
      .catch((error) => {
        console.log(error);
        if (this.props.journey.autoLogin !== true) {
          setSubmitting(false);
        }
        this.setState({ showBlocker: false });
      });
  };

  goNextRoute = () => {
    setTimeout(() => {
      this.props.history.push("/homepage");
    }, 0);
  };

  render() {
    return (
      <>
        <Header title={"Sign in"} history={this.props.history} />
        <div className="Signin">
          <p className="fade-in step-0">Please enter your sign in details.</p>
          <Formik
            initialValues={{
              email: getStorage("Login.email") || "",
              password: getStorage("Login.password") || "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Required";
              }
              if (!values.password) {
                errors.password = "Required";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setStorage("Login.email", values.email);
              setStorage("Login.password", values.password);
              //this.props.history.push('/homepage')
              this.tryLogin(setSubmitting);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="inputText">
                  <label htmlFor="email" className="inputLabel fade-in step-1">
                    Email
                  </label>
                  <div className="inputError">
                    {errors.email && touched.email && errors.email}
                  </div>
                </div>
                <input
                  type="text"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  autoComplete="email"
                  className="fade-in step-1"
                />

                <br />
                <div className="inputText">
                  <label htmlFor="password" className="fade-in step-2">
                    Password
                  </label>
                  <div className="inputError">
                    {errors.password && touched.password && errors.password}
                  </div>
                </div>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  autoComplete="current-password"
                  className="fade-in step-2"
                />
                {this.state.invalidLogin && (
                  <div>
                    <span style={{ color: "red" }}>Invalid Login</span>
                  </div>
                )}

                <button
                  className="Cta Cta--secondary fade-in step-3"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Sign in
                </button>
                <br />
                <Link to={"/forgotten"} className="fade-in step-4">
                  Forgotten password
                </Link>
              </form>
            )}
          </Formik>
        </div>
        {this.state.showBlocker === true && <Blocker />}
      </>
    );
  }
}

export default Signin;
