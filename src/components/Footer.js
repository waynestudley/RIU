import React from "react";
import { Link } from "react-router-dom";

import "../scss/components/Footer.scss";

import { ReactComponent as FooterHomeSvg } from "../images/footer/footer_home.svg";
import { ReactComponent as FooterProfileSvg } from "../images/footer/footer_profile.svg";
import { ReactComponent as FooterQuoteSvg } from "../images/footer/footer_quote.svg";

function FooterInner() {
  return (
    <div className="Footer__flexContainer">
      <div className="Footer__flexItem">
        <Link to="/homepage">
          <FooterHomeSvg />
          <h5 className="Footer__heading">Home</h5>
        </Link>
      </div>
      <div className="Footer__flexItem">
        <Link to="/quotes">
          <FooterQuoteSvg />
          <h5 className="Footer__heading">Quotes</h5>
        </Link>
      </div>
      <div className="Footer__flexItem">
        <Link to="/profile">
          <FooterProfileSvg />
          <h5 className="Footer__heading">Profile</h5>
        </Link>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <>
      <div className="Footer__spacer">
        <FooterInner />
      </div>
      <div className="Footer">
        <FooterInner />
      </div>
    </>
  );
}

export default Footer;
