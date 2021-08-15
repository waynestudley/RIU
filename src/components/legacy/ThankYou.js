import React from "react";
import { Link } from "react-router-dom";

//import { getStorage, setStorage } from "../utils/storage";

class ThankYou extends React.Component {
  goNextRoute = () => {
    this.props.history.push(this.props.nextRoute);
  };
  render() {
    return (
      <div>
        <h3>Thank You</h3>
        <Link to="/">Restart</Link>
      </div>
    );
  }
}

export default ThankYou;
