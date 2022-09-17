import React from "react";
import { useNavigate } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-4">
      <div className="col-span-2 sm:col-span-1">
        <img
          src={item.image}
          alt="productImage"
          className="w-[7vmax] sm:w-[9vmax] mx-auto"
        />
      </div>
      <div className="col-span-2 sm:col-span-1">
        <div className="flex gap-0.5 sm:gap-1 justify-center items-center sm:items-start flex-col h-full">
          <p
            className="text-[tomato] text-base sm:text-lg font-semibold capitalize"
            onClick={() => navigate(`/product/${item.product}`)}
          >
            {item.name}
          </p>
          <p className="font-semibold">{`Price: ₹${item.price}`}</p>
          <p
            className="cursor-pointer bg-red-600 text-white py-2 px-4 rounded-xl mt-1"
            onClick={() => deleteCartItems(item.product)}
          >
            Remove
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
