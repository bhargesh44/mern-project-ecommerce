import React from "react";
import CategoryFilter from "./CategoryFilter/CategoryFilter";
import PriceFilter from "./PriceFilter/PriceFilter";
import RatingsFilter from "./RatingsFilter/RatingsFilter";
import SearchFilter from "./SearchFilter/SearchFilter";

const ProductFilter = ({
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
  return (
    <>
      <div className="flex flex-col space-y-4">
        <SearchFilter
          keyword={keyword}
          setKeyword={setKeyword}
          GetAllProducts={GetAllProducts}
        />
        <PriceFilter price={price} priceHandler={priceHandler} />
        <CategoryFilter category={category} setCategory={setCategory} />
        <RatingsFilter ratings={ratings} setRatings={setRatings} />
      </div>
    </>
  );
};

export default ProductFilter;
