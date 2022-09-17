import React from "react";
import { Avatar, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import profilePng from "../../Assets/Images/Profile.png";

const ProductReviewCard = ({ review }) => {
  return (
    <div
      className="flex-none border bg-white flex flex-col items-center p-[3vmax] gap-1 hover:translate-y-[-1vmax] hover:shadow-[0_0_5px_rgba(0,0,0,0.25)] cursor-pointer"
      style={{ boxShadow: "0 0 5px rgba(0, 0, 0, 0.226)" }}
    >
      <Avatar
        src={profilePng}
        alt="Profile OImage"
        sx={{ width: 64, height: 64 }}
      />

      <p className="font-semibold text-lg">{review.name}</p>
      <Rating
        name="text-feedback"
        value={review.rating}
        readOnly
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      <span className="font-light text-base">{review.comment}</span>
    </div>
  );
};

export default ProductReviewCard;
