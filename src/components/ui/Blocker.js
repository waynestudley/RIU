import React, { useEffect } from "react";
import LoadingSpinner from "./ui/LoadingSpinner";

import "../scss/components/ui/Blocker.scss";

function Blocker() {
  return (
    <div className="Blocker">
      <LoadingSpinner />
    </div>
  );
}

export default Blocker;
