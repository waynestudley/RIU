import React from "react";
import { Link } from "react-router-dom";

import "../scss/components/Profile.scss";

import { ReactComponent as ArrowRight } from "../images/arrow-right.svg";

function ProfileMenuLink(props) {
  return (
    <Link to={props.to}>
      <div className="Profile__menuLink">
        <div>{props.label}</div>
        <div>
          <ArrowRight />
        </div>
      </div>
    </Link>
  );
}


export default ProfileMenuLink;
