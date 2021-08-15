import React from "react";
import axios from "axios";
import { Formik } from "formik";
import Header from "./Header";
import Blocker from "./Blocker";
import { setAxiosHeaders, getStorage, setStorage } from "../utils/storage";

import "../scss/components/Register.scss";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      showBlocker: false,
      validEmail: true,
      regError: null
    };
  }
  tryRegister = (setSubmitting) => {
    this.setState({ showBlocker: true });

    setStorage("Login.email", getStorage("Register.email"));
    setStorage("Login.password", getStorage("Register.password"));

    setAxiosHeaders();

    var params = {
      Firstname: getStorage("Register.firstName"),
      LastName: getStorage("Register.surName"),
      Email: getStorage("Register.email"),
      Password: getStorage("Register.password"),
      leadSellerId:'200200009'
    }

    axios
      .post(this.props.journey.api + "UserLogin/Register", params)
      .then((response) => {
        this.props.history.push("/success");
      })
      .catch((error, response) => {
        if (error.message === "Request failed with status code 400")
        setSubmitting(false);
        this.setState({ showBlocker: false,
          regError: error.response.data.Message });
      });
  };


    



  render() {
    return (
      <>
        <Header title={"Register"} history={this.props.history} />
        <div className="Register">
          <div className="fade-in step-0">
            <h2>Let us do the hard work for you.</h2>
            <p>
              Once you are registered we will use your details to populate any
              new forms so you don’t have to do this again and again.
            </p>
            
          </div>
          <Formik
            initialValues={{
              firstName: getStorage("Register.firstName") || "",
              surName: getStorage("Register.surName") || "",
              email: getStorage("Register.email") || "",
              password: getStorage("Register.password") || "",
              retypePassword: getStorage("Register.retypePassword") || "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.firstName) {
                errors.firstName = "Required";
              }
              if (!values.surName) {
                errors.surName = "Required";
              }
              if (values.firstName.length < 2) {
                errors.firstName = "Must be at least 2 characters";
              }
              if (values.surName.length < 2) {
                errors.surName = "Must be at least 2 characters";
              }
              if (!values.email) {
                errors.email = "Required";
              }
              const emailTest = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
              if (!emailTest.test(values.email)) {
                errors.email = "Please enter a valid email";
              }
 
              if (!values.password) {
                errors.password = "Required";
              }
              const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
              if (!strongRegex.test(values.password)) {
                errors.password = "Weak password - must contain at least one upper, lower, numerical and special characters - and be at least 8 characters long";
              }
              if (!values.retypePassword) {
                errors.retypePassword = "Required";
              }
              if (values.password !== values.retypePassword) {
                errors.password = "Passwords do not match";
              }
              if (values.terms === undefined) {
                errors.terms = "Required";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setStorage("Register.firstName", values.firstName);
              setStorage("Register.surName", values.surName);
              setStorage("Register.email", values.email);
              setStorage("Register.password", values.password);
              setStorage("Register.retypePassword", values.retypePassword);
              this.tryRegister(setSubmitting);
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
                  <label
                    htmlFor="firstName"
                    className="inputLabel fade-in step-1"
                  >
                    First name<span style={{ color: "red" }}>*</span>
                  </label>
                  <div className="inputError">
                    {errors.firstName && touched.firstName && errors.firstName}
                  </div>
                </div>
                <input
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                  autoComplete="firstName"
                  className="fade-in step-1"
                />
                <div className="inputText">
                  <label
                    htmlFor="surName"
                    className="inputLabel fade-in step-2"
                  >
                    Surname<span style={{ color: "red" }}>*</span>
                  </label>
                  <div className="inputError">
                    {errors.surName && touched.surName && errors.surName}
                  </div>
                </div>
                <input
                  type="text"
                  name="surName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.surName}
                  autoComplete="surName"
                  className="fade-in step-2"
                />
                <div className="inputText">
                  <label htmlFor="email" className="inputLabel fade-in step-3">
                    Email<span style={{ color: "red" }}>*</span>
                  </label>
                  {!this.state.validEmail &&
                    <span style={{ color: "red" }}>Email already in use</span>
                  }
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
                  className="fade-in step-3"
                />
                <div className="inputText">
                  <label
                    htmlFor="password"
                    className="inputLabel fade-in step-4"
                  >
                    Password<span style={{ color: "red" }}>*</span>
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
                  className="fade-in step-4"
                />
                <div className="inputText">
                  <label
                    htmlFor="retypePassword"
                    className="inputLabel fade-in step-5"
                  >
                    Retype Password<span style={{ color: "red" }}>*</span>
                  </label>
                  <div className="inputError">
                    {errors.retypePassword &&
                      touched.retypePassword &&
                      errors.retypePassword}
                  </div>
                </div>
                <input
                  type="password"
                  name="retypePassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.retypePassword}
                  autoComplete="retypePassword"
                  className="fade-in step-5"
                />
                <div
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  className="fade-in step-6"
                >
                  <div className="inputText">
                    <div className="inputError">
                      {errors.terms && errors.terms}
                    </div>
                  </div>

                  <div className="Profile__box">
                    <div style={{ position: "relative", minHeight: "40px" }}>
                      <input
                        className="ProfileContactPreferences__checkboxInput"
                        type="checkbox"
                        id="terms"
                        name="terms"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.terms}
                      />
                      <label
                        htmlFor="terms"
                        style={{ left: "0px", right: "auto", display: "block" }}
                      ></label>
                    </div>
                    <div className="ProfileContactPreferences__checkboxLabel">
                       Check this box to confirm you have read and agree with our 
                       <a href="https://www.moneyexpert.com/app/eula/" target="_blank" rel="noopener noreferrer"> <strong>End User Licence Agreement</strong></a> and terms of our <a href="https://www.moneyexpert.com/privacy-policy/" target="_blank" rel="noopener noreferrer"> <strong>Privacy Policy</strong></a> 
                    </div>
                  </div>
                  {this.state.regError && (
                    <span style={{ color: "red", fontSize: "2vh"}}>{this.state.regError}</span>
                  )}
                </div>

                <button
                  className="Cta Cta--secondary fade-in step-7"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Register
                </button>
              </form>
            )}
          </Formik>
        </div>
        {this.state.showBlocker === true && <Blocker />}
      </>
    );
  }
}

export default Register;
