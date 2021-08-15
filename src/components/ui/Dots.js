import React from "react";

import "../../scss/components/ui/Dots.scss";

function Dot(props) {
  return <div className={"Dots--" + props.color}>&nbsp;</div>;
}

function Dots(props) {
  const getDots = (numrows) => {
    let rows = [];
    for (let i = 0; i < numrows; i++) {
      if (i === props.currentDot) {
        rows.push(<Dot color={"black"} key={"dot" + i} />);
      } else {
        rows.push(<Dot color={"grey"} key={"dot" + i} />);
      }
    }
    return rows;
  };
  return <div className="Dots">{getDots(props.totalDots)}</div>;
}

export default Dots;
