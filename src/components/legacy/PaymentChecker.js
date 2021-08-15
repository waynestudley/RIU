import React from "react";
import axios from "axios";
import { Formik } from "formik";
import { getStorage, setStorage, setAxiosHeaders } from "../utils/storage";

class PaymentChecker extends React.Component {
  constructor() {
    super();
    this.state = {
      ofcomBand: "",
      providerList: null,
    };
  }
  componentDidMount() {
    setAxiosHeaders();
    axios
      .post(this.props.journey.api + "Media/GetOfcomBand", {
        CurrentMediaPackageBroadband: getStorage("Quote.broadbandCheck"),
        CurrentMediaPackagePhone: getStorage("Quote.phoneCheck"),
        CurrentMediaPackageTV: getStorage("Quote.smartTVCheck"),

        CurrentMediaPackageMovies: getStorage("Quote.moviesCheck"),
        CurrentMediaPackageSports: getStorage("Quote.sportsCheck"),
        CurrentMediaPackageEntertainment: getStorage(
          "Quote.entertainmentCheck"
        ),

        CurrentStreamServicesNetflix: getStorage("Quote.netflixCheck"),
        CurrentStreamServicesPrime: getStorage("Quote.primeCheck"),
        CurrentStreamServicesNowTV: getStorage("Quote.nowCheck"),

        NumDevicesHighUse: getStorage("Quote.numDevicesHighUse"),
        NumDevicesMediumUse: getStorage("Quote.numDevicesMediumUse"),
        NumDevicesLowUse: getStorage("Quote.numDevicesLowUse"),
      })
      .then((response) => {
        this.setState({ ofcomBand: response.data.Name });
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(
        this.props.journey.api +
          "Media/GetProviderList?countryId=" +
          this.props.journey.countryId
      )
      .then((response) => {
        this.setState({ providerList: response.data });
      });
  }
  goNextRoute = () => {
    this.props.history.push(this.props.nextRoute);
  };
  render() {
    return (
      <div>
        {(this.state.providerList === null || this.state.ofcomBand === "") && (
          <LoadingSpinner/>
        )}
        {this.state.providerList !== null && this.state.ofcomBand !== "" && (
          <>
            Your OfCom Usage Band is : {this.state.ofcomBand}
            <Formik
              initialValues={{
                currentMonthlyPayment:
                  getStorage("Quote.currentMonthlyPayment") || "",
                provider: getStorage("Quote.currentProviderId") || "",
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
                  "Quote.currentMonthlyPayment",
                  values.currentMonthlyPayment
                );
                setStorage("Quote.currentProviderId", values.provider);
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
                  <label htmlFor="provider">provider</label>
                  <select
                    name="provider"
                    value={values.provider}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option>Please select</option>
                    <option value={-1}>I dont have broadband</option>
                    {this.state.providerList !== null &&
                      this.state.providerList.map((item, i) => (
                        <option key={"key" + i} value={item.Id}>
                          {item.ProviderName}
                        </option>
                      ))}
                  </select>
                  {errors.provider && touched.provider && errors.provider}
                  <br />
                  <label>CurrentMonthlyPayment</label>
                  <input
                    type="text"
                    name="currentMonthlyPayment"
                    onChange={handleChange}
                    value={values.currentMonthlyPayment}
                    onBlur={handleBlur}
                  />
                  {errors.currentMonthlyPayment &&
                    touched.currentMonthlyPayment &&
                    errors.currentMonthlyPayment}
                    <br/>
                  <button type="submit" disabled={isSubmitting}>
                    Submit
                  </button>
                </form>
              )}
            </Formik>
          </>
        )}
      </div>
    );
  }
}

export default PaymentChecker;
