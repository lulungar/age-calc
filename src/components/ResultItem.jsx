import React from "react";

const ResultItem = ({ result, type }) => {
  return (
    <div className="output-item">
      <h1 className="result">{result ? `${result}` : "--"}</h1>
      <h1>{type}</h1>
    </div>
  );
};

export default ResultItem;
