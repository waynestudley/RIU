import React from "react";
import { Link } from "react-router-dom";

import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";
import { ReactComponent as FacebookIcon } from "../images/facebook-icon.svg";
import { ReactComponent as GoogleIcon } from "../images/google-icon.svg";
import Cta from "./ui/Cta";
import axios from "axios";
import { setAxiosHeaders, setStorage } from "../utils/storage";
import { ReactComponent as MexLogoSvg } from "../images/mex-logo-white.svg";

import "../scss/components/Landing.scss";

class Landing extends React.Component {
  constructor() {
    super();
    this.state = { showBlocker: false,
    invalidLogin: false };
  }

  tryFacebook = (response) => {
    console.log(">>>", response)
    var params = {
      token: response.accessToken,
    }
    axios
      .post(
        this.props.journey.api +  "Auth/facebook", params
      )
      .then((response) => {
        setStorage("Login.token", response.data);
        this.getUseDetails();
      })
      .catch((error) => {
        console.log(error);
        this.setState({ showBlocker: false,
        invalidLogin: true });
      });
  };

  tryGoogle = (response) => {
    console.log(">>>", response.tokenId)
    var params = {
      token: response.tokenId,
    }
    axios
      .post(this.props.journey.api +  "Auth/google", params)
      .then((response) => {
        console.log("User token:" ,  response.data.token)
        setStorage("Login.token", response.data.token);
        this.getUseDetails(response.data.token);
      })
      .catch((error) => {
        console.log(error);
        this.setState({ showBlocker: false,
        invalidLogin: true });
      });
  };

  getUseDetails = (tkn) => {
    setAxiosHeaders();
    var params = {
      token: tkn,
    }
    axios
      .post(this.props.journey.api + "UserLogin/GetUserDetails", params)
      .then((response) => {
        if (response.data === null || response.status === 401) {
          console.log(response);
        } else if (response.status !== 401) {

          setStorage("Profile.FirstName", response.data.FirstName);
          setStorage("Profile.Surname", response.data.Surname);
          setStorage("Profile.CustomerId", response.data.CustomerId);

          setStorage("Profile.Address1", response.data.Address1);
          setStorage("Profile.Address2", (response.data.Address2 !== 'null' ? response.data.Address2 : ''));
          setStorage("Profile.Address3", response.data.County);
          setStorage("Profile.Town", response.data.Town);
          setStorage("Profile.Postcode", response.data.Postcode);

          this.goNextRoute();
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ showBlocker: false });
      });
  };

  goNextRoute = () => {
    setTimeout(() => {
      this.props.history.push("/homepage");
    }, 0);
  };



  render() {
    // FB APPID
    // 670932536848864

    // GOOGLE APPID
    // 557560578922-91gb8euo4ni2t4n4n234dl3mkbpnineg.apps.googleusercontent.com
    
    return (
      <section className="Landing">
        <MexLogoSvg className="Landing__logo fade-in step-0" />
        <p className="Landing__tag fade-in step-1">
          We’ve helped over 1 Million people save on their utility and insurance
          bills
        </p>

        <p className="Landing__instruction fade-in step-2">
          Sign in with your existing Facebook or Google account
        </p>
        
        <FacebookLogin
          appId="670932536848864"
          autoLoad={false}
          callback={this.tryFacebook}
          fields="name,email"
          render={(renderProps) => (
            <button className="Cta Cta--facebook  fade-in step-1" onClick={renderProps.onClick}>
               <FacebookIcon className="Cta__facebookIcon" />
               Log in with Facebook</button>
               
          )}
        />

        <div className="Cta Cta--google fade-in step-2">
          <GoogleLogin
            clientId="557560578922-91gb8euo4ni2t4n4n234dl3mkbpnineg.apps.googleusercontent.com"
            render={renderProps => (
              <div>
              <GoogleIcon className="Cta__googleIcon" />
              <div onClick={renderProps.onClick} disabled={renderProps.disabled}>Log in with Google</div>
              </div>
            )}
            buttonText="Login"
            onSuccess={this.tryGoogle}
            onFailure={this.tryGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </div>
        <Link to="/signin">
          <Cta
            label="Sign in"
            skin="secondary"
            classList="fade-in step-3"
          />
        </Link>
        <div className="Landing__or fade-in step-4">
          <div className="Landing__divider"></div>
          <span className="Landing__span">Or</span>
          <div className="Landing__divider"></div>
        </div>
        <Link to="/register">
          <Cta
            label="Register"
            skin="primary"
            classList="fade-in step-3"
          />
        </Link>
      </section>
    );
  }
}

export default Landing;
