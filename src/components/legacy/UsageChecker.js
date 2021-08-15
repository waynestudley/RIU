import React from "react";
import { Formik } from "formik";
import { getStorage, setStorage } from "../utils/storage";

import "../scss/components/UsageChecker.scss";

class UsageChecker extends React.Component {

  goNextRoute = () => {
    this.props.history.push(this.props.nextRoute);
  };

  convertToStorage = (value) => {
    //console.log("convertToStorage", value);
    if (value === "on" || value === true) {
      return true;
    } else if (Array.isArray(value) && value[0] === "on") {
      return true;
    } else {
      return false;
    }
  };

  convertFromStorage = (value) => {
    //console.log("convertFromStorage", value);
    if (value === true || value === "true") {
      return true;
    } else {
      return false;
    }
  };

  render() {
    return (
      <div className="UsageChecker">
        <Formik
          initialValues={{
            broadbandCheck: this.convertFromStorage(
              getStorage("Quote.broadbandCheck")
            ),
            phoneCheck: this.convertFromStorage(getStorage("Quote.phoneCheck")),
            smartCheck: this.convertFromStorage(getStorage("Quote.smartCheck")),
            entertainmentCheck: this.convertFromStorage(
              getStorage("Quote.entertainmentCheck")
            ),
            sportsCheck: this.convertFromStorage(
              getStorage("Quote.sportsCheck")
            ),
            moviesCheck: this.convertFromStorage(
              getStorage("Quote.moviesCheck")
            ),
            netflixCheck: this.convertFromStorage(
              getStorage("Quote.netflixCheck")
            ),
            primeCheck: this.convertFromStorage(getStorage("Quote.primeCheck")),
            nowCheck: this.convertFromStorage(getStorage("Quote.nowCheck")),
          }}
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
            setStorage(
              "Quote.broadbandCheck",
              this.convertToStorage(values.broadbandCheck)
            );
            setStorage(
              "Quote.phoneCheck",
              this.convertToStorage(values.phoneCheck)
            );
            setStorage(
              "Quote.smartCheck",
              this.convertToStorage(values.smartCheck)
            );
            setStorage(
              "Quote.entertainmentCheck",
              this.convertToStorage(values.entertainmentCheck)
            );
            setStorage(
              "Quote.sportsCheck",
              this.convertToStorage(values.sportsCheck)
            );
            setStorage(
              "Quote.moviesCheck",
              this.convertToStorage(values.moviesCheck)
            );
            setStorage(
              "Quote.netflixCheck",
              this.convertToStorage(values.netflixCheck)
            );
            setStorage(
              "Quote.primeCheck",
              this.convertToStorage(values.primeCheck)
            );
            setStorage(
              "Quote.nowCheck",
              this.convertToStorage(values.nowCheck)
            );

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
              <label>broadbandCheck</label>
              <input
                type="checkbox"
                name="broadbandCheck"
                onChange={handleChange}
                onBlur={handleBlur}
                checked={values.broadbandCheck}
              />
              {errors.broadbandCheck &&
                touched.broadbandCheck &&
                errors.broadbandCheck}
              <label>phoneCheck</label>
              <input
                type="checkbox"
                name="phoneCheck"
                onChange={handleChange}
                onBlur={handleBlur}
                checked={values.phoneCheck}
              />
              {errors.phoneCheck && touched.phoneCheck && errors.phoneCheck}
              <label>smartCheck</label>
              <input
                type="checkbox"
                name="smartCheck"
                onChange={handleChange}
                onBlur={handleBlur}
                checked={values.smartCheck}
              />
              {errors.smartCheck && touched.smartCheck && errors.smartCheck}
              <br/>
              <label>entertainmentCheck</label>
              <input
                type="checkbox"
                name="entertainmentCheck"
                onChange={handleChange}
                onBlur={handleBlur}
                checked={values.entertainmentCheck}
              />
              {errors.entertainmentCheck &&
                touched.entertainmentCheck &&
                errors.entertainmentCheck}
              <label>sportsCheck</label>
              <input
                type="checkbox"
                name="sportsCheck"
                onChange={handleChange}
                onBlur={handleBlur}
                checked={values.sportsCheck}
              />
              {errors.sportsCheck && touched.sportsCheck && errors.sportsCheck}
              <label>moviesCheck</label>
              <input
                type="checkbox"
                name="moviesCheck"
                onChange={handleChange}
                onBlur={handleBlur}
                checked={values.moviesCheck}
              />
              {errors.moviesCheck && touched.moviesCheck && errors.moviesCheck}
              <br/>
              <label>netflixCheck</label>
              <input
                type="checkbox"
                name="netflixCheck"
                onChange={handleChange}
                onBlur={handleBlur}
                checked={values.netflixCheck}
              />
              {errors.netflixCheck &&
                touched.netflixCheck &&
                errors.netflixCheck}
              <label>primeCheck</label>
              <input
                type="checkbox"
                name="primeCheck"
                onChange={handleChange}
                onBlur={handleBlur}
                checked={values.primeCheck}
              />
              {errors.primeCheck && touched.primeCheck && errors.primeCheck}
              <label>nowCheck</label>
              <input
                type="checkbox"
                name="nowCheck"
                onChange={handleChange}
                onBlur={handleBlur}
                checked={values.nowCheck}
              />
              {errors.nowCheck && touched.nowCheck && errors.nowCheck}
              <br/>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

export default UsageChecker;
