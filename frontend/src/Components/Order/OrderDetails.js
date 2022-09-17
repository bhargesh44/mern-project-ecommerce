import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearErrors, getOrderDetails } from "../../Redux/Actions/orderAction";
import Loader from "../Layout/Loader";
import MetaData from "../Layout/MetaData";

const OrderDetails = () => {
  const navigate = useNavigate();
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();
  const alert = useAlert();

  const { id } = useParams();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(id));
  }, [alert, dispatch, error, id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Order Details" />
          <div className="container py-5 box-border flex flex-col min-h-[calc(100vh-237px)]">
            <h3 className="pb-5 font-semibold text-xl sm:text-2xl text-[tomato]">
              Order #{order && order._id}
            </h3>

            <div className="grid grid-cols-4 gap-8">
              <div className="col-span-4 lg:col-span-2">
                <div
                  className="bg-colorWhite p-5 rounded-xl w-full h-full"
                  style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)" }}
                >
                  <h2 className="font-bold text-xl text-center sm:text-start">Shipping Info</h2>

                  <div className="text-lg font-medium p-5 gap-3 flex flex-col">
                    <div className="flex items-center gap-2">
                      <b>Name:</b>
                      <span>{order.user && order.user.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <b>Phone:</b>
                      <span>
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <b>Address:</b>
                      <span>
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-2 lg:col-span-1">
                <div
                  className="bg-colorWhite p-5 rounded-xl w-full h-full"
                  style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)" }}
                >
                  <h2 className="font-bold text-xl text-center sm:text-start">Payment</h2>

                  <div className="text-lg font-medium p-5 gap-3 flex flex-col items-center sm:items-start">
                    <div className="flex items-center gap-2">
                      <p
                        className={
                          order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "text-[green]"
                            : "text-[red]"
                        }
                      >
                        {order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <b>Amount:</b>
                      <span>{order.totalPrice && order.totalPrice}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-2 lg:col-span-1">
                <div
                  className="bg-colorWhite p-5 rounded-xl w-full h-full"
                  style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)" }}
                >
                  <h2 className="font-bold text-xl text-center sm:text-start">Order Status:</h2>

                  <div className="text-lg font-medium p-5 gap-3 flex flex-col items-center sm:items-start">
                    <div className="flex items-center gap-2">
                      <p
                        className={
                          order.orderStatus && order.orderStatus === "Delivered"
                            ? "text-[green]"
                            : "text-[red]"
                        }
                      >
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="bg-colorWhite p-5 rounded-xl w-full mt-8"
              style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)" }}
            >
              <h2 className="font-bold text-xl">Order Items:</h2>

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
                      {order.orderItems &&
                        order.orderItems.map((item) => (
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
        </>
      )}
    </>
  );
};

export default OrderDetails;
