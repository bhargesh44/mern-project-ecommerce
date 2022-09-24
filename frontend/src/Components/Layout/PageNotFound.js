import React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="min-h-[calc(100vh-237px)] items-center justify-center flex flex-col gap-3">
      <ErrorIcon className="animate__animated animate__slideInDown text-[tomato] !text-9xl" />
      <h1 className=" font-bold animate__animated animate__slideInUp text-2xl">
        Page Not Found !!!!
      </h1>
      <Link to="/">
        <button className="!font-extrabold bg-colorBlack text-white cursor-pointer rounded-xl py-2 px-5">
          Home
        </button>
      </Link>
    </div>
  );
};

export default PageNotFound;
