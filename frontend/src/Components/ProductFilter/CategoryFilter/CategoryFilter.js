import { MenuItem, OutlinedInput, Select } from "@mui/material";
import React from "react";
import CardInteractive from "../CardInteractive/CardInteractive";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CategoryFilter = ({ category="", setCategory }) => {
  return (
    <CardInteractive
      cardTitle="Category"
      bottomComponent={
        <Select
          className="w-full"
          displayEmpty
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Category</em>;
            }

            return selected;
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          {categories.map((cat) => (
            <MenuItem
              key={cat}
              value={cat}
              className={`${
                category.indexOf(cat) === -1 ? "!font-normal" : "!font-semibold"
              }`}
            >
              {cat}
            </MenuItem>
          ))}
        </Select>
      }
    />
  );
};

export default CategoryFilter;
