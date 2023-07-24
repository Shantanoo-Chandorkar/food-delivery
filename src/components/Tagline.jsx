import React from "react";
import { GiSelfLove } from "react-icons/gi";
import { HiNoSymbol } from "react-icons/hi2";
import { PiPlantLight } from "react-icons/pi";

export default function Tagline() {
  return (
    <div className="tagline">
      <div className="tag-info d-flex flex-column flex-lg-row flex-md-column flex-sm-column flex-xs-column">
        <h3 className="h4" style={{ overflowY: "hidden" }}>
          <PiPlantLight /> 100% Veg
        </h3>
        <h3 className="h5" style={{ overflowY: "hidden" }}>
          <HiNoSymbol /> No preservatives and add-ons
        </h3>
        <h3 className="h6" style={{ overflowY: "hidden" }}>
          <GiSelfLove /> Made with love
        </h3>
      </div>
    </div>
  );
}
