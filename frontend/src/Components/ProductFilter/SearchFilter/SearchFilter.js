import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import React from "react";
import CardInteractive from "../CardInteractive/CardInteractive";
import SearchIcon from "@mui/icons-material/Search";

const SearchFilter = ({ keyword, setKeyword, GetAllProducts }) => {
  return (
    <CardInteractive
      cardTitle="Search By Name"
      bottomComponent={
        <OutlinedInput
          className="w-full"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyPress={(ev) => {
            if (ev.key === "Enter") {
              ev.preventDefault();
              GetAllProducts();
            }
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={GetAllProducts}>
                <SearchIcon className="hover:text-[#eb4034]" />
              </IconButton>
            </InputAdornment>
          }
        />
      }
    />
  );
};

export default SearchFilter;
