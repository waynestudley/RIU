import React from "react";
import axios from "axios";
import { Formik } from "formik";

import Header from "./Header";
import Footer from "./Footer";
import ProfileMenuLink from "./ProfileMenuLink";
import { setAxiosHeaders, getStorage, setStorage } from "../utils/storage";

import "../scss/components/Profile.scss";

//import i18n from "../i18n";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editBox: null,
      passwordUpdated: false,
      addressUpdated: false,
      postcodeList: [],
      Address1: "",
      Address2: "",
      Address3: "",
      Town: "",
      Postcode: "",
    };
  }

  componentDidMount() {
    //console.log(i18n.t("PackageSummaryOverviewHeading"));
    this.setState({
      Address1: getStorage("Profile.Address1") || "",
      Address2: getStorage("Profile.Address2") || "",
      Address3: getStorage("Profile.Address3") || "",
      Town: getStorage("Profile.Town") || "",
      Postcode: getStorage("Profile.Postcode") || "",
    });
  }

  changePostcode = async (e) => {
    let pc = e.target.value.toLowerCase().trim().replace(" ", "");
    this.state.Postcode = e.target.value.toLocaleUpperCase();
    setStorage("Profile.Postcode", pc.toLocaleUpperCase());
    if (
      /^[A-Za-z]{1,2}\d{1,2}[A-Za-z]{0,1}\s*\d{0,1}[A-Za-z]{2}_{0,2}$/i.test(
        e.target.value
      )
    ) {
      try {
        setAxiosHeaders();
        const response = await axios.get(
          "https://api.simplyswitch.com/api/Address/PostcodeLookupBtGbg?postcode=" +
            pc
        );
        if (
          response.status === 200 &&
          !response.data["ErrorCode"] &&
          response.data.length > 1
        ) {
          this.setState({ postcodeList: response.data });
          return true;
        } else {
          console.log("lookupPostcode : failed");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  showEditBoxPassword = () => {
    this.setState({
      editBox: "password",
      passwordUpdated: false,
      addressUpdated: false,
    });
  };

  showEditBoxAddress = () => {
    this.setState({
      editBox: "address",
      passwordUpdated: false,
      addressUpdated: false,
    });
  };

  closeEditBox = () => {
    this.setState({ editBox: null });
  };

  updatePassword = (values, setSubmitting) => {
    this.setState({ passwordUpdated: true });
    let url =
      this.props.journey.api +
      "UserLogin/UpdatePassword?" +
      "email=" +
      getStorage("Login.email") +
      "&password=" +
      values.password;
    setAxiosHeaders();
    axios
      .get(url)
      .then((response) => {
        if (response.data === null || response.status === 401) {
          console.log(response);
        } else if (response.status !== 401) {
          console.log(response);
        }
        this.setState({ passwordUpdated: true });
        setSubmitting(false);
        this.closeEditBox();
      })
      .catch((error) => {
        console.log(error);
        setSubmitting(false);
      });
  };

  updateAddress = (values, setSubmitting) => {
    let url =
      this.props.journey.api +
      "UserLogin/UpdateAddress?" +
      "address1=" +
      this.state.Address1 +
      "&address2=" +
      (this.state.Address2) +
      "&town=" +
      this.state.Town +
      "&county=" +
      (this.state.Address3) +
      "&postcode=" +
      this.state.Postcode;

      console.log(url)

    setStorage("Profile.Address1", this.state.Address1);
    setStorage("Profile.Address2", this.state.Address2);
    setStorage("Profile.Town", this.state.Town);
    setStorage("Profile.Address3", this.state.Address3);
    setStorage("Profile.Postcode", this.state.Postcode.toLocaleUpperCase());

    setAxiosHeaders();
    axios
      .get(url)
      .then((response) => {
        if (response.data === null || response.status === 401) {
          console.log(response);
        } else if (response.status !== 401) {
          console.log(response);
        }
        this.setState({ addressUpdated: true });
        setSubmitting(false);
        this.closeEditBox();
      })
      .catch((error) => {
        console.log(error);
        setSubmitting(false);
      });
  };

  selectAddress(address) {
    this.setState({
      Address1: address.Address1,
      Address2: address.Address2,
      Address3: address.County,
      Town: address.Town,
      Postcode: address.Postcode,
      postcodeList: [],
    });
  }

  render() {
    return (
      <>
        <Header
          title={"Profile"}
          history={this.props.history}
          backTo="/homepage"
        />
        <div className="Profile">
    <h4 className="Profile__heading">Account details - {getStorage("Login.email")}</h4>
          <div className="Profile__box">
            <label>Name</label>
            <p>
              {getStorage("Profile.FirstName") +
                " " +
                getStorage("Profile.Surname")}
            </p>
          </div>

          <div className="Profile__spacer"></div>

          <div className="Profile__box">
            <label>Password</label>
            {this.state.passwordUpdated && (
              <span style={{ color: "red" }}> - updated</span>
            )}
            {this.state.editBox !== "password" && (
              <>
                <button
                  className="Profile__edit"
                  onClick={this.showEditBoxPassword}
                >
                  Edit
                </button>
              </>
            )}
            {this.state.editBox === "password" && (
              <>
                <button className="Profile__edit" onClick={this.closeEditBox}>
                  Close
                </button>
                <PasswordForm updatePassword={this.updatePassword} />
              </>
            )}
          </div>

          <div className="Profile__spacer"></div>

          <div className="Profile__box">
            <label>Address</label>
            {this.state.addressUpdated && (
              <span style={{ color: "red" }}> - updated</span>
            )}
            {(this.state.editBox !== "address" && (
              <>
                <button
                  className="Profile__edit"
                  onClick={this.showEditBoxAddress}
                >
                  Edit
                </button>
                <p>
                  {this.state.Address1}
                  <br />
                  {this.state.Address2}
                  <br />
                  {this.state.Town}
                  <br />
                  {this.state.Address3}
                  <br />
                  {this.state.Postcode}
                </p>
              </>
            )) || (
              <Formik
                initialValues={{
                  address1: this.state.Address1 || "",
                  address2: this.state.Address2 || "",
                  address3: this.state.Address3 || "",
                  town: this.state.Town || "",
                  postcode: this.state.Postcode || "",
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.address1) {
                    errors.address1 = "Required";
                  }

                  if (!values.address3) {
                    errors.address3 = "Required";
                  }
                  if (!values.town) {
                    errors.town = "Required";
                  }
                  if (!values.postcode) {
                    errors.postcode = "Required";
                  }

                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setStorage("Profile.Address1", values.address1);
                  setStorage("Profile.Address2", values.address2);
                  setStorage("Profile.Address3", values.address3);
                  setStorage("Profile.Town", values.town);
                  setStorage("Profile.Postcode", values.postcode);

                  this.updateAddress(values, setSubmitting);
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
                        htmlFor="postcode"
                        className="inputLabel fade-in step-0"
                      >
                        postcode<span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="inputError">
                        {errors.postcode && touched.postcode && errors.postcode}
                      </div>
                    </div>
                    <input
                      type="text"
                      name="postcode"
                      onChange={this.changePostcode}
                      onBlur={handleBlur}
                      defaultValue={this.state.Postcode}
                      className="fade-in step-1"
                    />
                    <div className={"address_wrapper"}>
                      {this.state.postcodeList &&
                        this.state.postcodeList.map((address, index) => (
                          <p
                            key={"addressId" + index}
                            onClick={() => this.selectAddress(address)}
                            className=" lookup_data"
                          >
                            {address.Address1 + " " + address.Address2}
                          </p>
                        ))}
                    </div>
                    <div className="inputText">
                      <label
                        htmlFor="address1"
                        className="inputLabel fade-in step-0"
                      >
                        address1<span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="inputError">
                        {errors.address1 && touched.address1 && errors.address1}
                      </div>
                    </div>
                    <input
                      type="text"
                      name="address1"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={this.state.Address1}
                      className="fade-in step-1"
                    />

                    <div className="inputText">
                      <label
                        htmlFor="address2"
                        className="inputLabel fade-in step-0"
                      >
                        address2
                      </label>
                      <div className="inputError">
                        {errors.address2 && touched.address2 && errors.address2}
                      </div>
                    </div>
                    <input
                      type="text"
                      name="address2"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={this.state.Address2}
                      className="fade-in step-1"
                    />

                    <div className="inputText">
                      <label
                        htmlFor="town"
                        className="inputLabel fade-in step-0"
                      >
                        town<span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="inputError">
                        {errors.town && touched.town && errors.town}
                      </div>
                    </div>
                    <input
                      type="text"
                      name="town"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={this.state.Town}
                      className="fade-in step-1"
                    />

                    <div className="inputText">
                      <label
                        htmlFor="address3"
                        className="inputLabel fade-in step-0"
                      >
                        county<span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="inputError">
                        {errors.address3 && touched.address3 && errors.address3}
                      </div>
                    </div>
                    <input
                      type="text"
                      name="address3"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address3}
                      className="fade-in step-1"
                    />

                    <div className="Profile__spacer"></div>

                    <button
                      className="Cta Cta--secondary fade-in step-2"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Submit
                    </button>
                  </form>
                )}
              </Formik>
            )}
            {this.state.editBox === "address" && (
              <>
                <button className="Profile__edit" onClick={this.closeEditBox}>
                  Close
                </button>
              </>
            )}
          </div>

          <h4 className="Profile__heading">Other options</h4>

          <div className="Profile__box">
            <ProfileMenuLink
              label="Contact preferences"
              to="/profile_contact_preferences"
            />
            <ProfileMenuLink
              label="My renewal alerts"
              to="/profile_my_alerts"
            />
            <ProfileMenuLink label="My rewards" to="/profile_my_rewards" />
            <ProfileMenuLink label="Legal" to="/profile_legal" />
            <ProfileMenuLink label="Support" to="/profile_support" />
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

function PasswordForm(props) {
  return (
    <Formik
      initialValues={{
        password: getStorage("Login.password") || "",
        retypePassword: getStorage("Login.password") || "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.password) {
          errors.password = "Required";
        }
        if (!values.retypePassword) {
          errors.retypePassword = "Required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setStorage("Login.password", values.password);
        setStorage("Login.retypePassword", values.retypePassword);
        props.updatePassword(values, setSubmitting);
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
            <label htmlFor="password" className="inputLabel fade-in step-0">
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
            className="fade-in step-1"
          />
          <div className="inputText">
            <label
              htmlFor="retypePassword"
              className="inputLabel fade-in step-1"
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
            className="fade-in step-2"
          />
          <div className="Profile__spacer"></div>
          <button
            className="Cta Cta--secondary fade-in step-2"
            type="submit"
            disabled={isSubmitting}
          >
            Submit
          </button>
        </form>
      )}
    </Formik>
  );
}

export default Profile;
