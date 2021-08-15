import React from "react";
import PropTypes from "prop-types";

import { ReactComponent as FacebookIconSvg } from "../../images/facebook-icon.svg";
import { ReactComponent as GoogleIconSvg } from "../../images/google-icon.svg";

import "../../scss/components/ui/Cta.scss";

function Cta(props) {
  const getClassName = () => {
    if(props.skin === "facebook"){
     return "Cta--facebook";
    }else if(props.skin === "google"){
      return "Cta--google";
     }else if(props.skin === "primary"){
      return "Cta--primary";
    }else if(props.skin === "secondary"){
      return "Cta--secondary";
     }
  };
  
  return (
    <>
      <button
        className={"Cta " + getClassName(props.skin) + " " + props.classList}
        onClick={props.handleClick}
      >
        {props.skin === "facebook" && (
          <FacebookIconSvg className="Cta__facebookIcon" />
        )}
         {props.skin === "google" && (
           <GoogleIconSvg className="Cta__googleIcon" />
        )}
        {props.label}
      </button>
    </>
  );
}

Cta.defaultProps = {
  classList:"",
  skin:"primary",
  label:"CTA"
}
Cta.propTypes = {
  classList: PropTypes.string,
  skin: PropTypes.string.isRequired,
  label:PropTypes.string,
  handleClick:PropTypes.func
};

export default Cta;
