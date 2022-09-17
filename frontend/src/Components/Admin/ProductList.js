import React, { useEffect, useState } from "react";
import MetaData from "../Layout/MetaData";
import AdminSidebar from "./AdminSidebar";
import MobileAdminSidebar from "./MobileAdminSidebar";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  clearErrors,
  deleteProduct,
  getAdminProduct,
} from "../../Redux/Actions/productAction";
import PostAddIcon from "@mui/icons-material/PostAdd";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DELETE_PRODUCT_RESET } from "../../Redux/Constants/productConstants";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error, products } = useSelector((state) => state.products);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

  const columns = [
    {
      field: "id",
      headerName: "Product ID",
      headerClassName: "text-white bg-[tomato]",
      minWidth: 250,
      flex: 0.5,
    },

    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.3,
      headerClassName: "text-white bg-[tomato]",
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 100,
      flex: 0.3,
      headerClassName: "text-white bg-[tomato]",
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 100,
      flex: 0.3,
      headerClassName: "text-white bg-[tomato]",
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
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon color="success" />
            </Link>

            <Button
              onClick={() => {
                setDeleteId(params.getValue(params.id, "id"));
                deleteProductToggle();
              }}
            >
              <DeleteIcon color="error" />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="grid grid-cols-5">
        <div className="col-span-1 hidden lg:block">
          <AdminSidebar />
        </div>
        <div className="col-span-5 lg:col-span-4 bg-white p-5 sm:p-10">
          <div className="flex items-center mb-10 justify-between">
            <MobileAdminSidebar />
            <h3 className="font-semibold text-center text-xl sm:text-2xl text-[tomato]">
              All Products
            </h3>

            <Button
              variant="outlined"
              className="!capitalize !font-semibold"
              startIcon={<PostAddIcon />}
              onClick={() => navigate("/admin/product")}
            >
              Create <p className="ml-1 hidden sm:flex">Product</p>
            </Button>
          </div>
          <div className="box-border">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="!bg-white"
              autoHeight
            />
          </div>
        </div>
        <Dialog
          open={open}
          onClose={deleteProductToggle}
          aria-labelledby="alert-dialog-title"
        >
          <DialogTitle className="text-[tomato] !font-semibold">
            Delete Product
          </DialogTitle>
          <DialogContent>
            <DialogContentText className="!text-black ">
              Do you want to delete this product???
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={deleteProductToggle}
              color="warning"
              variant="contained"
            >
              No
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => deleteProductHandler(deleteId)}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default ProductList;
