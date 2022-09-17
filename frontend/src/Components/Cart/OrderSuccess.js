import React from "react";
import MetaData from "../Layout/MetaData";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();
  return (
    <>
      <MetaData title="Payment Success" />
      <div className="flex min-h-[calc(100vh-237px)] justify-center flex-col pb-5">
        <div className="flex items-center flex-col gap-6 sm:gap-8 border bg-colorPale rounded-2xl p-5 sm:p-10 mx-[5%] sm:mx-[10%]">
          <CheckCircleIcon color="primary" className="!text-[7vmax]" />
          <h3 className="font-semibold text-xl sm:text-2xl text-[#03014C] text-center">
            Your Order has been Placed successfully
          </h3>
          <button
            className="bg-[tomato] border-none font-normal text-lg text-white py-3 px-8 rounded-xl text-center hover:scale-105"
            style={{ transition: "all 0.5s" }}
            onClick={() => navigate("/orders")}
          >
            View Orders
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;
