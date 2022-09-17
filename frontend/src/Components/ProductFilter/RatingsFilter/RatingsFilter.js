import { Slider } from "@mui/material";
import React from "react";
import CardInteractive from "../CardInteractive/CardInteractive";

const RatingsFilter = ({ ratings, setRatings }) => {
  return (
    <CardInteractive
      cardTitle="Ratings Above"
      bottomComponent={
        <Slider
          value={ratings}
          onChange={(e, newRating) => {
            setRatings(newRating);
          }}
          aria-labelledby="continuous-slider"
          valueLabelDisplay="auto"
          min={0}
          max={5}
        />
      }
    />
  );
};

export default RatingsFilter;
