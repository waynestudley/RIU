import React from "react";
import { Formik } from "formik";
import axios from "axios";
import {
  getStorage,
  setStorage,
  clearAllStorage,
  setAxiosHeaders,
} from "../utils/storage";

import LoadingSpinner from "./ui/LoadingSpinner";

class Login extends React.Component {
  componentDidMount() {
    clearAllStorage();
    if (this.props.journey.autoLogin === true) {
      axios
        .post(this.props.journey.api + "auth/createtoken?" + this.props.journey.credentials)
        .then((response) => {
          setStorage("Login.token", response.data);
          this.getAgentDetails();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  goNextRoute = () => {
    setTimeout(() => {
      this.props.history.push(this.props.nextRoute);
    }, 0);
  };

  tryLogin = (setSubmitting) => {
    axios
      .post(
        this.props.journey.api +
          "auth/createtoken?username=" +
          getStorage("Login.username") +
          "&password=" +
          getStorage("Login.password")
      )
      .then((response) => {
        setStorage("Login.token", response.data);
        this.getAgentDetails(setSubmitting);
      })
      .catch((error) => {
        console.log(error);
        setSubmitting(false);
      });
  };

  getAgentDetails = (setSubmitting) => {
    setAxiosHeaders();
    axios
      .post(this.props.journey.api + "UserAccount/GetAgentDetails")
      .then((response) => {
        if (response.data === null || response.status === 401) {
          console.log(response);
        } else if (response.status !== 401) {
          setStorage("Login.SalesAgentId", response.data.SalesAgentId);
          setStorage("Login.CallcentreId", response.data.CallCentreId);
          setStorage("Login.Name", response.data.Name);
          setStorage("Login.Data", JSON.stringify(response.data));

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
      });
  };
  render() {
    if ( this.props.journey.autoLogin === true) {
      return <LoadingSpinner/>;
    } else {
      return (
        <>
          <Formik
            initialValues={{
              username: getStorage("Login.username") || "",
              password: getStorage("Login.password") || "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.username) {
                errors.username = "Required";
              }
              if (!values.password) {
                errors.password = "Required";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setStorage("Login.username", values.username);
              setStorage("Login.password", values.password);

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
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  autoComplete="username"
                />
                {errors.username && touched.username && errors.username}
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  autoComplete="current-password"
                />
                {errors.password && touched.password && errors.password}
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </form>
            )}
          </Formik>
        </>
      );
    }
  }
}

export default Login;
