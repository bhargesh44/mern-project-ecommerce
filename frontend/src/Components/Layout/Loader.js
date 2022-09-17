import { CircularProgress } from "@mui/material";
import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-237px)]">
      <CircularProgress color="primary" size={100} thickness={1} />
    </div>
  );
};

export default Loader;
