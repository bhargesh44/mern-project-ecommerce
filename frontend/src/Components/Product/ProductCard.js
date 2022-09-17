import { Rating } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";

const ProductCard = ({ product }) => {
  return (
    <Link
      className="bg-white hover:translate-y-[-1vmax] hover:shadow-[0_0_5px_rgba(0,0,0,0.25)] "
      to={`/product/${product._id}`}
      style={{
        color: "rgb(48,48,48)",
        transition: "all 0.5s",
      }}
    >
      <img src={product.images[0].url} alt={product.name} />
      <p className="font-semibold text-base m-[0.5vmax] ">{product.name}</p>
      <div className="flex items-center m-[0.5vmax]">
        <Rating
          name="text-feedback"
          value={product.ratings}
          readOnly
          precision={0.5}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        <span className="m-[0.5vmax] font-medium text-base lg:text-lg">
          {" "}
          ({product.numOfReviews} Reviews)
        </span>
      </div>
      <span className="font-medium text-lg m-[0.5vmax] text-[tomato]">{`₹${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
