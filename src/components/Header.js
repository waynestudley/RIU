import React from "react";
import PropTypes from 'prop-types';

import { ReactComponent as ArrowLeft } from "../images/arrow-left.svg";

import "../scss/components/Header.scss";

function Header(props) {
  let goBack = () => {
    props.history.push(props.backTo);
  };
  return (
    <div className="Header">
      {props.showBack === true && (
        <button onClick={goBack}>
          <ArrowLeft />
        </button>
      )}
      <h3>{props.title}</h3>
    </div>
  );
}

Header.defaultProps = {
  showBack:true,
  backTo:"/landing"
}
Header.propTypes = {
  showBack: PropTypes.bool,
  backTo: PropTypes.string
};

export default Header;