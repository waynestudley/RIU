import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import YourQuotes from "./YourQuotes";

import "../scss/components/Quotes.scss";

class Quotes extends React.Component {
  render() {
    return (
      <>
        <Header
          title={"Quotes"}
          history={this.props.history}
          backTo="/homepage"
        />
        <div>
          <YourQuotes classList="fade-in step-0" journey={this.props.journey}/>
        </div>
        <Footer />
      </>
    );
  }
}

export default Quotes;
