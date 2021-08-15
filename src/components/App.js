import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";

import { initialise } from "../i18n";

import Init from "./Init";
import journeys from "../data/journeys";

import JourneyHome from "./journeys/JourneyHome";

class App extends React.Component {
  constructor() {
    super();
    this.state = { i18nInit: false };
  }
  componentDidMount() {
    initialise(this.onInitialise);
  }
  onInitialise = () => {
    this.setState({ i18nInit: true });
  };
  render() {
    let journey = journeys[0];
    return (
      <div className="App">
        {this.state.i18nInit === true && (
          <Router>
            <Route
              exact
              path="/"
              render={(renderProps) => (
                <Init {...renderProps} nextRoute="/landing" />
              )}
            />
            {journey.name === "home" && <JourneyHome journey={journey} />}
          </Router>
        )}
      </div>
    );
  }
}

export default App;
