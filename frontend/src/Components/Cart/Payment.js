import React, { useEffect, useRef } from "react";
import MetaData from "../Layout/MetaData";
import CheckOutSteps from "./CheckOutSteps";

import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { clearErrors, createOrder } from "../../Redux/Actions/orderAction";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          navigate("/success");
        } else {
          alert.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <>
      <MetaData title="Payment" />
      <CheckOutSteps activeStep={2} />
      <div className="flex min-h-[calc(100vh-301px)] justify-center flex-col py-5">
        <h3 className="pb-2 font-semibold text-xl sm:text-2xl text-[#03014C] flex justify-center ">
          Card Info
        </h3>
        <div className="mt-8 border bg-colorPale rounded-2xl p-5 sm:p-10 mx-[5%] sm:mx-[10%]">
          <form onSubmit={(e) => submitHandler(e)}>
            <div className="flex flex-col">
              <div className="flex  justify-center">
                <div className="flex sm:block flex-col mb-6 w-[90%] md:w-5/6 lg:w-3/4">
                  <div className="flex items-center gap-4">
                    <CreditCardIcon sx={{ mr: 2 }} className="text-black" />
                    <CardNumberElement className="w-full" />
                  </div>
                </div>
              </div>
              <div className="flex  justify-center">
                <div className="flex sm:block flex-col mb-6 w-[90%] md:w-5/6 lg:w-3/4">
                  <div className="flex items-center gap-4">
                    <EventIcon sx={{ mr: 2 }} className="text-black" />
                    <CardExpiryElement className="w-full" />
                  </div>
                </div>
              </div>
              <div className="flex  justify-center">
                <div className="flex sm:block flex-col mb-6 w-[90%] md:w-5/6 lg:w-3/4">
                  <div className="flex items-center gap-4">
                    <VpnKeyIcon sx={{ mr: 2 }} className="text-black" />
                    <CardCvcElement className="w-full" />
                  </div>
                </div>
              </div>
              <div className="flex justify-center ">
                <button
                  type="submit"
                  ref={payBtn}
                  className="bg-[#eb4034] hover:bg-[#eb4034] text-gray-100 p-4 w-[90%] md:w-5/6 lg:w-3/4 rounded-xl tracking-wide
                  font-semibold font-display focus:outline-none focus:shadow-outline 
                  shadow-lg flex items-center justify-center"
                >
                  {`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Payment;
