import React from "react";
import  Header from "./Header";

class Google extends React.Component {

  render() {
    return (
      <div className="Google">
      <Header title={"Google"} history={this.props.history}/>
      </div>
    );
  }
}

export default Google;
