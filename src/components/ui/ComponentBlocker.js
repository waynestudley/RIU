import React from "react";
import LoadingSpinner from "./LoadingSpinner";

import "../../scss/components/ui/ComponentBlocker.scss";

function ComponentBlocker() {
  return (
    <div className="ComponentBlocker">
      <LoadingSpinner />
    </div>
  );
}

export default ComponentBlocker;
