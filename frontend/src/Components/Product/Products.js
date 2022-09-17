import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../Redux/Actions/productAction";
import MetaData from "../Layout/MetaData";
import ProductCard from "./ProductCard";
import ProductFilter from "../ProductFilter/ProductFilter";
import MobileFilter from "../ProductFilter/MobileFilter";
import Loader from "../Layout/Loader";

const Products = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    // filteredProductsCount,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    GetAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, alert, error, page, price, category, ratings]);

  const GetAllProducts = () => {
    dispatch(getProduct(keyword, page, price, category, ratings));
  };

  const handleChange = (e, p) => {
    setPage(p);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  return (
    <>
      <MetaData title="PRODUCTS -- ECOMMERCE" />
      <div className="pb-5">
        <h2 className="text-center text-xl font-semibold border-b p-3 mb-10 mx-auto w-[300px]">
          Products
        </h2>
        <div className="grid grid-cols-4 gap-10">
          <div className="col-span-1 hidden lg:block">
            <div className="w-full">
              <h2 className="font-semibold text-2xl xl:text-4xl mb-6">
                Filter option
              </h2>
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

          <div className="col-span-4 lg:col-span-3">
            <MobileFilter
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
            {loading ? (
              <Loader />
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
                  {products &&
                    products?.map((product) => (
                      <ProductCard product={product} key={product._id} />
                    ))}
                </div>

                {resultPerPage < productsCount && (
                  <div className="flex items-center justify-center pt-10">
                    <Pagination
                      count={Math.ceil(productsCount / resultPerPage)}
                      color="primary"
                      page={page}
                      onChange={handleChange}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
