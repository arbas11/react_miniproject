import React from "react";

function ButtonAction({ what, todo, toChange, setProductData, value }) {
  return (
    <button
      className={`btn-action-${what}`}
      onClick={() => {
        todo(toChange);
        setProductData(value);
      }}
    >
      {what}
    </button>
  );
}
export default ButtonAction;
