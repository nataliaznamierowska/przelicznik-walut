import React from "react";

function Result({ resultValue }) {
  return (
    <div className="result">
      {resultValue !== null ? (
        <p className="result-text">{resultValue}</p>
      ) : (
        <p className="error-text">{resultValue}</p>
      )}
    </div>
  );
}

export default Result;
