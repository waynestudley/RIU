import React from "react";
import { Formik } from "formik";
import axios from "axios";
import { Trans } from "react-i18next";
import { getStorage, setStorage, setAxiosHeaders } from "../utils/storage";

import LoadingSpinner from "./ui/LoadingSpinner";

class ZipcodeChecker extends React.Component {
  constructor() {
    super();
    this.state = { packageData: null };
  }
  componentDidMount() {
    setAxiosHeaders();
    axios
      .post(
        this.props.journey.api +
          "Media/GetPromotionalPackageList?countryId=" +
          this.props.journey.countryId
      )
      .then((response) => {
        this.setState({ packageData: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  goNextRoute = () => {
    this.props.history.push(this.props.nextRoute);
  };
  render() {
    return (
      <div>
        <Formik
          initialValues={{ postcode: getStorage("Quote.postcode") || "" }}
          validate={(values) => {
            const errors = {};
            /*
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            */
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setStorage("Quote.postcode", values.postcode);
            setSubmitting(false);
            this.goNextRoute();
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
              <label>
                <Trans i18nKey="Zipcode">{" "}</Trans>
              </label>
              <input
                type="text"
                name="postcode"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.postcode}
              />
              {errors.postcode && touched.postcode && errors.postcode}
              <br/>
              <button type="submit" disabled={isSubmitting}>
                <Trans i18nKey="Submit">{" "}</Trans>
              </button>
            </form>
          )}
        </Formik>
        {this.state.packageData === null && (
          <LoadingSpinner/>
        )}
        {this.state.packageData !== null &&
          this.state.packageData.map((item, i) => (
            <div className="" key={"key" + i}>
              {item.PackageName}
            </div>
          ))}
      </div>
    );
  }
}

export default ZipcodeChecker;
