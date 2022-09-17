import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ProductFilter from "./ProductFilter";

const MobileFilter = ({
  keyword,
  setKeyword,
  GetAllProducts,
  price,
  priceHandler,
  category,
  setCategory,
  ratings,
  setRatings,
}) => {
  const [filterOpen, setFilterOpen] = useState(false);

  const toggleFilterMenu = () => {
    setFilterOpen(!filterOpen);
  };

  return (
    <>
      <button
        onClick={toggleFilterMenu}
        className="flex items-center gap-2 border p-3 mb-10 rounded-md lg:hidden bg-colorWhite text-colorBlack"
      >
        <FilterAltIcon />
        <span className="font-semibold">Filter Options</span>
      </button>

      <div
        className={`lg:hidden p-4 py-10 w-10/12 fixed z-50 left-0 top-0 h-screen transition-transform duration-300 bg-colorWhite border-l ${
          !filterOpen ? "-translate-x-full" : ""
        }`}
      >
        <div className="mb-10 flex justify-end">
          <button onClick={toggleFilterMenu}>
            <CloseIcon className="text-black" />
          </button>
        </div>
        <div className="h-[90%] pb-10 overflow-y-scroll">
          <div className="max-w-md mx-auto">
            <div className="w-full">
              <ProductFilter
                keyword={keyword}
                setKeyword={setKeyword}
                GetAllProducts={GetAllProducts}
                price={price}
                priceHandler={priceHandler}
                category={category}
                setCategory={setCategory}
                ratings={ratings}
                setRatings={setRatings}
              />
            </div>
          </div>
        </div>
      </div>
      {filterOpen && (
        <div
          onClick={toggleFilterMenu}
          className="fixed w-screen h-screen left-0 top-0 z-40 bg-colorPrimary opacity-20 lg:hidden"
        ></div>
      )}
    </>
  );
};

export default MobileFilter;
