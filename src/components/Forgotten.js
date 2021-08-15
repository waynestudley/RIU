import React from "react";
//import { Link } from "react-router-dom";
import axios from "axios";
import { Formik } from "formik";
import Header from "./Header";
import Blocker from "./Blocker";
import { getStorage, setStorage } from "../utils/storage";

import "../scss/components/Forgotten.scss";

class Forgotten extends React.Component {
  constructor() {
    super();
    this.state = { showBlocker: false };
  }

  tryRequest = (setSubmitting) => {
    this.setState({ showBlocker: true });
    axios
      .post(
        this.props.journey.api +
          "UserLogin/ForgottenPassword?email=" +
          getStorage("Login.email")
      )
      .then((response) => {
        this.props.history.push("/confirm");
      })
      .catch((error) => {
        console.log(error);
        setSubmitting(false);
        this.setState({ showBlocker: false });
      });
  };
  render() {
    return (
      <>
        <Header title={"Forgotten password"} history={this.props.history} />
        <div className="Forgotten">
          <p className="fade-in step-0">Please enter your email address</p>
          <Formik
            initialValues={{
              email: getStorage("Login.email") || "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Required";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setStorage("Login.email", values.email);
              this.tryRequest(setSubmitting);
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
                    Registered email
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
                <button
                  className="Cta Cta--secondary fade-in step-2"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Next
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

export default Forgotten;
