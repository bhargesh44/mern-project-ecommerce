import React from "react";

const CardWrapper = ({ children }) => {
  return (
    <div className={`bg-colorWhite border border-colorGrey rounded-md`}>
      {children}
    </div>
  );
};

export default CardWrapper;
