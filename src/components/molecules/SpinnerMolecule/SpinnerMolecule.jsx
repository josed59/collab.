import React,{ useState } from "react";
import './spinnerMolecule.scss';


function SpinnerMolecule() {

  return (
    <>
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    </>
  );
}

export default SpinnerMolecule;