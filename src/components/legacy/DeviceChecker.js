import React from "react";
import { Formik } from "formik";
import { getStorage, setStorage } from "../utils/storage";

class DeviceChecker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errorMessage: "" };
  }
  goNextRoute = () => {
    this.props.history.push(this.props.nextRoute);
  };
  checkSelected = (index, label) => {
    return <option value={index}>{label}</option>;
  };
  getOptionList = () => {
    return (
      <>
        {this.checkSelected(0, "0")}
        {this.checkSelected(1, "1")}
        {this.checkSelected(2, "2")}
        {this.checkSelected(3, "3")}
        {this.checkSelected(4, "4")}
        {this.checkSelected(5, "5")}
        {this.checkSelected(6, "6+")}
      </>
    );
  };
  render() {
    return (
      <div>
        <Formik
          initialValues={{
            mobiles: getStorage("Quote.mobiles") || 0,
            tablets: getStorage("Quote.tablets") || 0,
            laptops: getStorage("Quote.laptops") || 0,
            tvs: getStorage("Quote.tvs") || 0,
            consoles: getStorage("Quote.consoles") || 0,
            watches: getStorage("Quote.watches") || 0,
            hubs: getStorage("Quote.hubs") || 0,
            speakers: getStorage("Quote.speakers") || 0,
            meters: getStorage("Quote.meters") || 0,
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
            let HighUse =
              Number(values.mobiles) +
              Number(values.tvs) +
              Number(values.laptops) +
              Number(values.tablets);
            let MediumUse = Number(values.consoles) + Number(values.speakers);
            let LowUse =
              Number(values.watches) +
              Number(values.meters) +
              Number(values.hubs);

            setSubmitting(false);

            if (HighUse === 0 && MediumUse === 0 && LowUse === 0) {
              this.setState({ errorMessage: "Select at least one device" });
            } else {
              setStorage("Quote.numDevicesHighUse", HighUse);
              setStorage("Quote.numDevicesMediumUse", MediumUse);
              setStorage("Quote.numDevicesLowUse", LowUse);

              setStorage("Quote.mobiles", values.mobiles);
              setStorage("Quote.tablets", values.tablets);
              setStorage("Quote.laptops", values.laptops);
              setStorage("Quote.tvs", values.tvs);
              setStorage("Quote.consoles", values.consoles);
              setStorage("Quote.watches", values.watches);
              setStorage("Quote.hubs", values.hubs);
              setStorage("Quote.speakers", values.speakers);
              setStorage("Quote.meters", values.meters);
              
              this.goNextRoute();
            }
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
              {this.state.errorMessage && <h4>{this.state.errorMessage}</h4>}

              <label htmlFor="mobile">mobiles</label>
              <select
                name="mobiles"
                value={values.mobiles}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                {this.getOptionList()}
              </select>
              {errors.mobiles && touched.mobiles && errors.mobiles}

              <label htmlFor="tablets">tablets</label>
              <select
                name="tablets"
                value={values.tablets}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                {this.getOptionList()}
              </select>
              {errors.tablets && touched.tablets && errors.tablets}

              <label htmlFor="laptops">laptops</label>
              <select
                name="laptops"
                value={values.laptops}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                {this.getOptionList()}
              </select>
              {errors.laptops && touched.laptops && errors.laptops}
              <br/>

              <label htmlFor="tvs">tvs</label>
              <select
                name="tvs"
                value={values.tvs}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                {this.getOptionList()}
              </select>
              {errors.tvs && touched.tvs && errors.tvs}

              <label htmlFor="consoles">consoles</label>
              <select
                name="consoles"
                value={values.consoles}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                {this.getOptionList()}
              </select>
              {errors.consoles && touched.consoles && errors.consoles}

              <label htmlFor="watches">watches</label>
              <select
                name="watches"
                value={values.watches}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                {this.getOptionList()}
              </select>
              {errors.watches && touched.watches && errors.watches}
              <br/>

              <label htmlFor="hubs">hubs</label>
              <select
                name="hubs"
                value={values.hubs}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                {this.getOptionList()}
              </select>
              {errors.hubs && touched.hubs && errors.hubs}

              <label htmlFor="speakers">speakers</label>
              <select
                name="speakers"
                value={values.speakers}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                {this.getOptionList()}
              </select>
              {errors.speakers && touched.speakers && errors.speakers}

              <label htmlFor="meters">meters</label>
              <select
                name="meters"
                value={values.meters}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                {this.getOptionList()}
              </select>
              {errors.meters && touched.meters && errors.meters}
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

export default DeviceChecker;
