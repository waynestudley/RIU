import React from "react";
import { Link } from "react-router-dom";

import "../scss/components/Breadcrumb.scss";

function Breadcrumb(props) {

  let foundIt = false;

  return (
    <div className="Breadcrumb">
      {props.allBreadcrumbs.map((item, i) => {

        let foundThisTime = false;

        if (item[0] === props.location.pathname) {
          foundIt = true;
          foundThisTime = true;
        }

        let classList = "";
        
        if (foundThisTime) {
          classList = "Breadcrumb__item--selected";
        } else {
          classList = "Breadcrumb__item";
        }

        if (foundIt) {
          return (
            <div className={classList} key={"bci" + i}>
              {item[1]}
            </div>
          );
        } else {
          return (
            <div className={classList} key={"bci" + i}>
              <Link to={item[0]}>{item[1]}</Link>
            </div>
          );
        }

      })}
    </div>
  );
}

export default Breadcrumb;
