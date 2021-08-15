import React from "react";

class ReactComp extends React.Component {
  constructor(props) {
    super(props);
    console.log("ReactComp construct");
  }
  componentDidMount() {
    console.log("ReactComp ComponentDidMount");
  }
  componentWillUnmount() {
    console.log("ReactComp ComponentWillUnmount");
  }
  render() {
    return <h1>ReactComp</h1>;
  }
}

export default ReactComp;
