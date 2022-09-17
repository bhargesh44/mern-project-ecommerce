import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../Redux/Actions/productAction";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import MetaData from "../Layout/MetaData";
import ProductReviewCard from "./ProductReviewCard";
import { useAlert } from "react-alert";
import { addItemsToCart } from "../../Redux/Actions/cartAction";
import Loader from "../Layout/Loader";
import { NEW_REVIEW_RESET } from "../../Redux/Constants/productConstants";
import { useForm } from "react-hook-form";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);

  const { register, handleSubmit, reset } = useForm();

  const { id } = useParams();
  const alert = useAlert();

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);

  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const responsive = {
    0: {
      items: 1,
    },
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getProductDetails(id));
  }, [alert, dispatch, error, id, reviewError, success]);

  const increaseQuantity = () => {
    if (product.Stock <= quantity) {
      return;
    }

    const qty = quantity + 1;

    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) {
      return;
    }

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added To Cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = (data) => {
    console.log(data);
    const myForm = new FormData();

    myForm.set("productId", id);
    myForm.set("rating", rating);
    myForm.set("comment", data.comment);

    dispatch(newReview(myForm));

    setOpen(false);
    reset();
  };
  const onError = (errors) => console.log("Errors Occurred !! :", errors);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${product.name} -- ECOMMERCE`} />
          <div className="pb-4">
            <div className="grid grid-cols-2 box-border">
              <div className="col-span-2 sm:col-span-1 p-[2vmax] box-border">
                <AliceCarousel
                  mouseTracking
                  infinite
                  autoPlayInterval={1000}
                  animationDuration={1500}
                  disableButtonsControls
                  responsive={responsive}
                  autoPlay
                  items={
                    product.images &&
                    product.images?.map((itm, i) => (
                      <img
                        key={itm.url}
                        src={itm.url}
                        alt={`${i} Slide`}
                        className="w-full lg:w-3/4 mx-auto"
                      />
                    ))
                  }
                />
              </div>
              <div className="col-span-2 sm:col-span-1 p-[2vmax] box-border">
                <div className="text-center sm:text-start">
                  <h2
                    className="font-semibold text-xl"
                    style={{ color: "rgb(54, 54, 54)" }}
                  >
                    {product.name}
                  </h2>
                  <p
                    className="font-extralight text-base mt-4"
                    style={{ color: "rgba(54, 54, 54, 0.582)" }}
                  >
                    Product # {product._id}
                  </p>
                </div>
                <div className="flex items-center justify-center sm:justify-start py-4 border-t border-b mt-4">
                  <Rating
                    name="text-feedback"
                    value={product.ratings}
                    readOnly
                    size="large"
                    precision={0.5}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                  <span className="font-medium text-base lg:text-lg">
                    ({product.numOfReviews} Reviews)
                  </span>
                </div>

                <div className="text-center sm:text-start">
                  <h1 className="font-semibold text-xl my-5">{`₹${product.price}`}</h1>
                  <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start">
                    <div>
                      <button
                        className="border-none p-2 cursor-pointer text-white"
                        style={{
                          backgroundColor: "rgba(0, 0, 0, 0.616)",
                          transition: "all 0.5s",
                          borderRadius: "12px 0 0 12px",
                        }}
                        onClick={decreaseQuantity}
                      >
                        -
                      </button>
                      <input
                        readOnly
                        type="number"
                        value={quantity}
                        className="border-none p-2 w-20 text-center outline-none font-semibold text-base bg-colorPale"
                        style={{ color: "rgba(0, 0, 0, 0.74)" }}
                      />
                      <button
                        className="border-none p-2 cursor-pointer text-white"
                        style={{
                          backgroundColor: "rgba(0, 0, 0, 0.616)",
                          transition: "all 0.5s",
                          borderRadius: "0 12px 12px 0",
                        }}
                        onClick={increaseQuantity}
                      >
                        +
                      </button>
                    </div>
                    <button
                      disabled={product.Stock < 1 ? true : false}
                      className="border-none py-2 px-4 rounded-xl bg-[tomato] cursor-pointer text-white font-medium text-base sm:ml-5 mt-5 sm:mt-0 outline-none hover:bg-[#D6543D]"
                      style={{
                        transition: "all 0.5s",
                      }}
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </button>
                  </div>

                  <p
                    className="border-t border-b py-4 font-normal text-base my-[1vmax]"
                    style={{ color: "rgba(0, 0, 0, 0.205)" }}
                  >
                    Status:
                    <b
                      className={`${
                        product.Stock < 1 ? "text-[red]" : "text-[green]"
                      } ml-2
                    `}
                    >
                      {product.Stock < 1 ? "OutOfStock" : "InStock"}
                    </b>
                  </p>
                </div>

                <div
                  className="font-semibold text-xl flex flex-wrap py-4 items-center justify-center sm:justify-start"
                  style={{ color: "rgba(0, 0, 0, 0.897)" }}
                >
                  Description :
                  <p
                    className="font-light text-base ml-2"
                    style={{ color: "rgba(0, 0, 0, 0.534)" }}
                  >
                    {product.description}
                  </p>
                </div>
                <div className="flex items-center justify-center sm:justify-start">
                  <button
                    className=" border-none bg-[tomato] font-medium text-base rounded-xl py-2 px-4 my-4 text-white cursor-pointer outline-none hover:scale-110 hover:bg-[#C5442D]"
                    style={{
                      transition: "all 0.5s",
                    }}
                    onClick={submitReviewToggle}
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            </div>

            <h3 className="text-[#000000be] font-semibold text-lg text-center border-b p-4 w-[20vmax] m-auto mb-[4vmax]">
              REVIEWS
            </h3>

            <Dialog
              aria-labelledby="simple-dialog-title"
              open={open}
              onClose={submitReviewToggle}
            >
              <DialogTitle>Submit Review</DialogTitle>
              <form onSubmit={handleSubmit(reviewSubmitHandler, onError)}>
                <DialogContent className="flex flex-col">
                  <Rating
                    defaultValue={0}
                    size="large"
                    precision={0.5}
                    onChange={(e) => {
                      console.log(typeof e.target.value);
                      setRating(e.target.value);
                    }}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                  <textarea
                    className="border outline-none font-semibold text-base p-2 my-4"
                    cols="30"
                    rows="5"
                    {...register("comment")}
                  ></textarea>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={submitReviewToggle}
                    color="error"
                    variant="contained"
                  >
                    Cancel
                  </Button>
                  <Button color="success" type="submit" variant="contained">
                    Submit
                  </Button>
                </DialogActions>
              </form>
            </Dialog>

            {product.reviews && product.reviews[0] ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-center">
                {product.reviews &&
                  product.reviews.map((review) => (
                    <ProductReviewCard key={review._id} review={review} />
                  ))}
              </div>
            ) : (
              <p className="font-semibold text-center text-lg text-[tomato]">
                No Reviews Yet
              </p>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
