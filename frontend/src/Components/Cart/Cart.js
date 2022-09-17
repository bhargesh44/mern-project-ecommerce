import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import EmptyCart from "../../Assets/Images/empty-cart.webp";
import {
  addItemsToCart,
  removeItemsFromCart,
} from "../../Redux/Actions/cartAction";
import MetaData from "../Layout/MetaData";
import CartItemCard from "./CartItemCard ";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };
  return (
    <div className="min-h-[calc(100vh-237px)]">
      <MetaData title="Cart" />

      {cartItems.length === 0 ? (
        <div className="flex flex-col justify-center gap-5 h-[calc(100vh-341px)] items-center">
          <img
            src={EmptyCart}
            alt="EmptyCart"
            className="animate__animated animate__slideInDown"
          />
          <h1 className=" font-bold animate__animated animate__slideInUp">
            Your Cart is Empty!
            <Link to="/products">
              <strong className="text-[tomato] !font-extrabold underline ml-2 cursor-pointer">
                View Products
              </strong>
            </Link>
          </h1>
        </div>
      ) : (
        <div className="pb-5">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow className="bg-[tomato]">
                  <TableCell align="center" className="!font-bold !text-white">
                    Product
                  </TableCell>
                  <TableCell align="center" className="!font-bold !text-white">
                    Quantity
                  </TableCell>
                  <TableCell align="center" className="!font-bold !text-white">
                    Subtotal
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems &&
                  cartItems.map((item) => (
                    <TableRow key={item.product}>
                      <TableCell>
                        <CartItemCard
                          item={item}
                          deleteCartItems={deleteCartItems}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <button
                          className="border-none p-2 cursor-pointer text-white"
                          style={{
                            backgroundColor: "rgba(0, 0, 0, 0.616)",
                            transition: "all 0.5s",
                            borderRadius: "12px 0 0 12px",
                          }}
                          onClick={() =>
                            decreaseQuantity(item.product, item.quantity)
                          }
                        >
                          -
                        </button>
                        <input
                          readOnly
                          type="number"
                          value={item.quantity}
                          className="border-none p-1 w-10 sm:w-20 text-center outline-none font-semibold text-base bg-colorPale"
                          style={{ color: "rgba(0, 0, 0, 0.74)" }}
                        />
                        <button
                          className="border-none p-2 cursor-pointer text-white"
                          style={{
                            backgroundColor: "rgba(0, 0, 0, 0.616)",
                            transition: "all 0.5s",
                            borderRadius: "0 12px 12px 0",
                          }}
                          onClick={() =>
                            increaseQuantity(
                              item.product,
                              item.quantity,
                              item.stock
                            )
                          }
                        >
                          +
                        </button>
                      </TableCell>
                      <TableCell align="center" className="!font-bold">
                        {`₹${item.price * item.quantity}`}{" "}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <div
            className="bg-colorWhite p-5 mt-5 rounded-xl w-full sm:w-3/4 lg:w-1/2 mx-auto"
            style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)" }}
          >
            <h2 className="font-bold text-[tomato] text-center">
              Gross Total :{" "}
              {`₹${cartItems.reduce(
                (acc, item) => acc + item.quantity * item.price,
                0
              )}`}
            </h2>
            <button
              className="w-full rounded-lg mt-4 p-3 bg-transparent uppercase border cursor-pointer hover:bg-[tomato] hover:text-white"
              onClick={() => navigate("/login?redirect=/shipping")}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
