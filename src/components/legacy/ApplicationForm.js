import React from "react";
import { Formik } from "formik";
import { Trans } from "react-i18next";
import { getStorage, setStorage } from "../utils/storage";

class ApplicationForm extends React.Component {
  goNextRoute = () => {
    this.props.history.push(this.props.nextRoute);
  };
  render() {
    
    return (
      <div>
        <Formik
          initialValues={{
            firstName: getStorage("Quote.firstName") || "",
            lastName: getStorage("Quote.lastName") || "",
            address: getStorage("Quote.address") || "",
            unitApt: getStorage("Quote.unitApt") || "",
            state: getStorage("Quote.state") || "",
            postcode: getStorage("Quote.postcode") || "",
            email: getStorage("Quote.email") || "",
            phone: getStorage("Quote.phone") || "",
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
            /*
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);*/
            
            setStorage("Quote.firstName", values.firstName);
            setStorage("Quote.lastName", values.lastName);
            setStorage("Quote.address", values.address);
            setStorage("Quote.unitApt", values.unitApt);

            setStorage("Quote.state", values.state);
            setStorage("Quote.postcode", values.postcode);
            setStorage("Quote.email", values.email);
            setStorage("Quote.phone", values.phone);

            //setSubmitting(false);
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

              <label htmlFor="firstName">
                <Trans i18nKey="FirstName" />
              </label>
              <input
                type="text"
                name="firstName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
              />
              {errors.firstName && touched.firstName && errors.firstName}
              <br />

              <label htmlFor="lastName">
                <Trans i18nKey="LastName" />
              </label>
              <input
                type="text"
                name="lastName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
              />
              {errors.lastName && touched.lastName && errors.lastName}
              <br />

              <label htmlFor="address">
                <Trans i18nKey="ServiceAddress" />
              </label>
              <input
                type="text"
                name="address"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
              />
              {errors.address && touched.address && errors.address}
              <br />

              <label htmlFor="unitApt">
                <Trans i18nKey="UnitApt" />
              </label>
              <input
                type="text"
                name="unitApt"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.unitApt}
              />
              {errors.unitApt && touched.unitApt && errors.unitApt}
              <br />

              <label htmlFor="state">
                <Trans i18nKey="State" />
              </label>
              <select
                name="state"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.state}
              >
                <option value="">Please select</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
              {errors.state && touched.state && errors.state}
              <br />

              <label htmlFor="postcode">
                <Trans i18nKey="Zipcode" />
              </label>
              <input
                type="text"
                name="postcode"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.postcode}
              />
              {errors.postcode && touched.postcode && errors.postcode}
              <br />

              <label htmlFor="email">
                <Trans i18nKey="Email" />
              </label>
              <input
                type="text"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && errors.email}
              <br />

              <label htmlFor="phone">
                <Trans i18nKey="Phone" />
              </label>
              <input
                type="text"
                name="phone"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
              />
              {errors.phone && touched.phone && errors.phone}
              <br />

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

export default ApplicationForm;
