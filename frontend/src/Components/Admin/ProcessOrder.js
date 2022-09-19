import {
  CircularProgress,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearErrors,
  getOrderDetails,
  updateOrder,
} from "../../Redux/Actions/orderAction";
import { UPDATE_ORDER_RESET } from "../../Redux/Constants/orderConstants";
import Loader from "../Layout/Loader";
import MetaData from "../Layout/MetaData";
import AdminSidebar from "./AdminSidebar";
import MobileAdminSidebar from "./MobileAdminSidebar";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

const ProcessOrder = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const updateOrderSubmitHandler = (data) => {
    console.log(data);

    dispatch(updateOrder(id, data));
  };
  const onError = (errors) => console.log("Errors Occurred !! :", errors);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, isUpdated, updateError, id]);

  return (
    <>
      <MetaData title="Process Order" />

      <div className="grid grid-cols-5">
        <div className="col-span-1 hidden lg:block">
          <AdminSidebar />
        </div>
        <div className="col-span-5 lg:col-span-4 bg-white p-5 sm:p-10">
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="flex items-center mb-10 justify-between">
                <MobileAdminSidebar />
                <h3 className="font-semibold text-center text-base sm:text-2xl text-[tomato] w-full items-center">
                  Order #{order && order._id}
                </h3>
              </div>

              <div className="grid grid-cols-4 gap-8">
                <div
                  className={`col-span-4 ${
                    order?.orderStatus === "Delivered"
                      ? "sm:col-span-4"
                      : "sm:col-span-2 "
                  }`}
                >
                  <div className="grid grid-cols-4 gap-8">
                    <div
                      className={`col-span-4  ${
                        order?.orderStatus !== "Delivered"
                          ? "lg:col-span-4"
                          : "lg:col-span-2"
                      }`}
                    >
                      <div
                        className="bg-colorWhite p-5 rounded-xl w-full h-full"
                        style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)" }}
                      >
                        <h2 className="font-bold text-xl text-center sm:text-start">
                          Shipping Info
                        </h2>

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

                    <div
                      className={`col-span-4  ${
                        order?.orderStatus !== "Delivered"
                          ? "lg:col-span-4"
                          : "lg:col-span-1"
                      }`}
                    >
                      <div
                        className="bg-colorWhite p-5 rounded-xl w-full h-full"
                        style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)" }}
                      >
                        <h2 className="font-bold text-xl text-center sm:text-start">
                          Payment
                        </h2>

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
                          <div className="flex items-center gap-2 flex-wrap">
                            <b>Amount:</b>
                            <span>{order.totalPrice && order.totalPrice}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`col-span-4  ${
                        order?.orderStatus !== "Delivered"
                          ? "lg:col-span-4"
                          : "lg:col-span-1"
                      }`}
                    >
                      <div
                        className="bg-colorWhite p-5 rounded-xl w-full h-full"
                        style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)" }}
                      >
                        <h2 className="font-bold text-xl text-center sm:text-start">
                          Order Status:
                        </h2>

                        <div className="text-lg font-medium p-5 gap-3 flex flex-col items-center sm:items-start">
                          <div className="flex items-center gap-2">
                            <p
                              className={
                                order?.orderStatus &&
                                order?.orderStatus === "Delivered"
                                  ? "text-[green]"
                                  : "text-[red]"
                              }
                            >
                              {order?.orderStatus && order?.orderStatus}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`col-span-4 sm:col-span-2 my-auto ${
                    order?.orderStatus === "Delivered" ? "hidden" : "block"
                  }`}
                >
                  <h3 className="pb-4 font-semibold text-xl sm:text-2xl text-[#03014C] flex justify-center ">
                    Process Order
                  </h3>
                  <div className="border bg-colorPale rounded-2xl px-5 py-5 sm:py-10">
                    <form
                      onSubmit={handleSubmit(updateOrderSubmitHandler, onError)}
                      onReset={reset}
                    >
                      <div className="flex flex-col">
                        <div className="flex justify-center">
                          <div className="flex sm:block flex-col mb-5 w-[90%]">
                            <Box
                              sx={{ display: "flex", alignItems: "flex-end" }}
                            >
                              <AccountTreeIcon
                                sx={{ mr: 2, my: 0.5 }}
                                className="text-black"
                              />
                              <TextField
                                select
                                id="input-with-sx"
                                label="Order Status"
                                variant="standard"
                                className="w-full"
                                {...register("status", {
                                  required: "Status is required",
                                })}
                              >
                                {order?.orderStatus === "Processing" && (
                                  <MenuItem value="Shipped">Shipped</MenuItem>
                                )}

                                {order?.orderStatus === "Shipped" && (
                                  <MenuItem value="Delivered">
                                    Delivered
                                  </MenuItem>
                                )}
                              </TextField>
                            </Box>
                            <div className="mt-2 ml-9">
                              {errors.status && (
                                <span
                                  style={{ color: "red" }}
                                  className="-mb-6"
                                >
                                  {errors.status?.message}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-center ">
                          <button
                            type="submit"
                            className="bg-[#eb4034] hover:bg-[#eb4034] text-gray-100 p-4 w-[90%] rounded-xl tracking-wide
                            font-semibold font-display focus:outline-none focus:shadow-outline 
                            shadow-lg flex items-center justify-center"
                          >
                            {loading && (
                              <CircularProgress
                                size={20}
                                sx={{ color: "white", mr: 2 }}
                              />
                            )}
                            Process
                          </button>
                        </div>
                      </div>
                    </form>
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
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProcessOrder;
