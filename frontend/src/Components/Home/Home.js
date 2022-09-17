import React, { useEffect } from "react";
import MouseIcon from "@mui/icons-material/Mouse";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../Layout/MetaData";
import { clearErrors, getProduct } from "../../Redux/Actions/productAction";
import ProductCard from "../Product/ProductCard";
import Loader from "../Layout/Loader";

const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct());
  }, [alert, dispatch, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="ECOMMERCE" />
          <div
            className="bg-center bg-no-repeat bg-cover h-[100vh] flex flex-col text-center items-center justify-center text-white "
            style={{
              backgroundImage: "linear-gradient(to right , #635dc0 , #3027ae)",
            }}
          >
            <p className="font-light text-lg">Welcome to Ecommerce</p>
            <h1 className="m-10 text-xl font-semibold text-white">
              FIND AMAZING PRODUCTS BELOW
            </h1>

            <a href="#container">
              <button
                className=" cursor-pointer bg-white border rounded p-3 text-black font-medium hover:bg-[#eb4034] hover:text-white"
                style={{ transition: "all 0.5s" }}
              >
                Scroll <MouseIcon />
              </button>
            </a>
          </div>

          <h2
            className="text-center text-lg font-semibold border-b p-3 my-20 mx-auto w-[300px]"
            id="container"
          >
            Featured Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 place-items-center pb-5">
            {products &&
              products?.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
