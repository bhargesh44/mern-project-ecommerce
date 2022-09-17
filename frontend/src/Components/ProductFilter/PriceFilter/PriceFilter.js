import { Slider } from "@mui/material";
import React from "react";
import CardInteractive from "../CardInteractive/CardInteractive";

const PriceFilter = ({ price, priceHandler }) => {
  return (
    <CardInteractive
      cardTitle="Price"
      bottomComponent={
        <Slider
          size="small"
          value={price}
          onChange={priceHandler}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={0}
          max={25000}
        />
      }
    />
  );
};

export default PriceFilter;
