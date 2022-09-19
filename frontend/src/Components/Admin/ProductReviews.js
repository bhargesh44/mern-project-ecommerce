import { Button, CircularProgress, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../Layout/MetaData";
import AdminSidebar from "./AdminSidebar";
import MobileAdminSidebar from "./MobileAdminSidebar";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  clearErrors,
  deleteReviews,
  getAllReviews,
} from "../../Redux/Actions/productAction";
import { DELETE_REVIEW_RESET } from "../../Redux/Constants/productConstants";

const ProductReviews = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );

  const navigate = useNavigate();
  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Review Deleted Successfully");
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, alert, error, deleteError, isDeleted, navigate, productId]);

  const columns = [
    {
      field: "id",
      headerName: "Review ID",
      minWidth: 200,
      flex: 0.5,
      headerClassName: "text-white bg-[tomato]",
    },

    {
      field: "user",
      headerName: "User",
      minWidth: 100,
      flex: 0.6,
      headerClassName: "text-white bg-[tomato]",
    },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 250,
      flex: 0.5,
      headerClassName: "text-white bg-[tomato]",
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 100,
      flex: 0.4,
      headerClassName: "text-white bg-[tomato]",

      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      headerClassName: "text-white bg-[tomato]",
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() =>
                deleteReviewHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon color="error" />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  return (
    <>
      <MetaData title={`ALL REVIEWS - Admin`} />

      <div className="grid grid-cols-5">
        <div className="col-span-1 hidden lg:block">
          <AdminSidebar />
        </div>
        <div className="col-span-5 lg:col-span-4 bg-white p-5 sm:p-10">
          <div className="flex items-center mb-10 justify-start">
            <MobileAdminSidebar />
            <h3 className="font-semibold text-center text-xl sm:text-2xl text-[tomato] w-full items-center">
              All Reviews
            </h3>
          </div>

          <div className="my-8 border bg-colorPale rounded-2xl p-5 sm:p-10 lg:mx-[10%]">
            <form>
              <div className="flex flex-col">
                <div className="flex  justify-center">
                  <div className="flex sm:block flex-col mb-6 w-[90%] md:w-5/6 lg:w-3/4">
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <StarIcon
                        sx={{ mr: 2, my: 0.5 }}
                        className="text-black"
                      />
                      <TextField
                        id="input-with-sx"
                        label="Product Id"
                        variant="standard"
                        className="w-full"
                        type="text"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                      />
                    </Box>
                  </div>
                </div>

                <div className="flex justify-center ">
                  <button
                    onClick={productReviewsSubmitHandler}
                    className="bg-[#eb4034] hover:bg-[#eb4034] text-gray-100 p-4 w-[90%] md:w-5/6 lg:w-3/4 rounded-xl tracking-wide
                    font-semibold font-display focus:outline-none focus:shadow-outline 
                    shadow-lg flex items-center justify-center"
                  >
                    {loading && (
                      <CircularProgress
                        size={20}
                        sx={{ color: "white", mr: 2 }}
                      />
                    )}
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>

          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <p className="font-semibold text-center text-lg text-[tomato]">
              No Reviews Yet
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductReviews;
