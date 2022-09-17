import {
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MetaData from "../Layout/MetaData";
import CheckOutSteps from "./CheckOutSteps";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/process/payment");
  };

  return (
    <>
      <MetaData title="Confirm Order" />
      <CheckOutSteps activeStep={1} />
      <div className="flex min-h-[calc(100vh-301px)] justify-center flex-col pt-10 pb-5">
        <div className="grid grid-cols-4 gap-8">
          <div className="col-span-4 lg:col-span-3">
            <div
              className="bg-colorWhite p-5 rounded-xl w-full"
              style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)" }}
            >
              <h2 className="font-bold text-xl">Shipping Info</h2>

              <div className="text-lg font-medium p-5 gap-3 flex flex-col">
                <div className="flex items-center gap-2">
                  <b>Name:</b>
                  <span>{user.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <b>Phone:</b>
                  <span>{shippingInfo.phoneNo}</span>
                </div>
                <div className="flex items-center gap-2">
                  <b>Address:</b>
                  <span>{address}</span>
                </div>
              </div>
            </div>

            <div
              className="bg-colorWhite p-5 rounded-xl w-full mt-8"
              style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)" }}
            >
              <h2 className="font-bold text-xl">Your Cart Items:</h2>

              <div className="mt-5">
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow className="bg-[tomato]">
                        <TableCell
                          align="center"
                          className="!font-bold !text-white"
                        >
                          Image
                        </TableCell>
                        <TableCell
                          align="center"
                          className="!font-bold !text-white"
                        >
                          Name
                        </TableCell>
                        <TableCell
                          align="center"
                          className="!font-bold !text-white"
                        >
                          Price
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cartItems &&
                        cartItems.map((item) => (
                          <TableRow key={item.product}>
                            <TableCell align="center">
                              <img
                                src={item.image}
                                alt="Product"
                                className="w-[7vmax] sm:w-[9vmax] mx-auto"
                              />
                            </TableCell>

                            <TableCell
                              align="center"
                              className="!text-[tomato] !text-base sm:!text-lg !font-semibold !capitalize"
                              onClick={() =>
                                navigate(`/product/${item.product}`)
                              }
                            >
                              {item.name}
                            </TableCell>

                            <TableCell align="center">
                              {" "}
                              {item.quantity} X ₹{item.price} ={" "}
                              <b>₹{item.price * item.quantity}</b>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
          <div className="col-span-4 lg:col-span-1 ">
            <div
              className="bg-colorWhite p-5 rounded-xl w-full"
              style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)" }}
            >
              <h2 className="font-bold text-xl text-center mb-5">
                Order Summery
              </h2>
              <div className="flex justify-between items-center mb-3">
                <b>Subtotal:</b>
                <p className="text-right">₹{subtotal}</p>
              </div>
              <div className="mb-3 flex justify-between items-center mt-2">
                <b>Shipping Charges:</b>
                <p className="text-right">₹{shippingCharges}</p>
              </div>

              <div className="mb-3 flex justify-between items-center mt-2">
                <b>GST:</b>
                <p className="text-right">₹{tax}</p>
              </div>
              <Divider className="!my-5" />
              <div className="mb-3 flex justify-between items-center text-[tomato] mt-2">
                <b>Total:</b>
                <b className="text-right">₹{totalPrice}</b>
              </div>
              <button
                className="w-full rounded-lg p-3 bg-[tomato] uppercase border cursor-pointer hover:bg-[tomato] text-white"
                onClick={proceedToPayment}
              >
                Proceed To Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
