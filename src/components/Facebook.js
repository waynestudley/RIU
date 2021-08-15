import React from "react";
import  Header from "./Header";

class Facebook extends React.Component {
  render() {
    return (
      <div className="Facebook">
        <Header title={"Facebook"} history={this.props.history} />
      </div>
    );
  }
}

export default Facebook;
